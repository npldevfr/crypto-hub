// import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import type { ModelPaginatorContract } from '@ioc:Adonis/Lucid/Orm'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { rules, schema, validator } from '@ioc:Adonis/Core/Validator'
import User from '../../Models/User'

export default class UserController {
  /**
   * @swagger
   * /api/users:
   *  get:
   *    tags:
   *      - Users
   *    description: Get all users
   *    produces:
   *      - application/json
   *    responses:
   *      200:
   *         description: Success
   *         content:
   *          application/json:
   *            schema:
   *              type: array
   *              items:
   *                $ref: '#/components/schemas/User'
   * @param request
   * @param bouncer
   */
  public async index({ request, bouncer }: HttpContextContract): Promise<ModelPaginatorContract<User>> {
    await bouncer.with('UserPolicy').authorize('viewList')
    const { page, perPage, sortBy, sortDirection, query } = request.qs()

    let usersQuery = User.query().preload('roles')

    // If search query is present and has more than 2 characters, apply search filter
    if (query && query.length > 2) {
      usersQuery = usersQuery
        .whereILike('email', `%${query}%`)
        .orWhereILike('username', `%${query}%`)
        .orWhereHas('roles', (builder) => {
          builder.whereILike('name', `%${query}%`)
        })
    }

    // Apply sorting and pagination
    return await usersQuery.orderBy(sortBy || 'email', sortDirection || 'asc').paginate(page || 1, perPage || 10)
  }

  /**
   * @swagger
   * /api/users/{id}:
   *   get:
   *     tags:
   *       - Users
   *     description: Get details of a specific user
   *     parameters:
   *       - name: id
   *         in: path
   *         required: true
   *         schema:
   *           type: string
   *     produces:
   *       - application/json
   *     responses:
   *       200:
   *         description: Success
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/User'
   *       406:
   *         description: Not Acceptable
   * @param params
   * @param bouncer
   */
  public async show({ params, bouncer }: HttpContextContract): Promise<User> {
    await bouncer.with('UserPolicy').authorize('view')

    return await User
      .query()
      .preload('roles')
      .preload('providers')
      .where('id', params.id)
      .firstOrFail()
  }

  /**
   * @swagger
   * /api/users:
   *   post:
   *     tags:
   *       - Users
   *     description: Create a new user
   *     produces:
   *       - application/json
   *     requestBody:
   *       description: User object
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             $ref: '#/components/schemas/User'
   *     responses:
   *       201:
   *         description: Success
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/User'
   *       406:
   *         description: Not Acceptable
   * @param request
   * @param response
   * @param bouncer
   */
  public async destroy({ params, response, bouncer }: HttpContextContract): Promise<void> {
    await bouncer.with('UserPolicy').authorize('destroy')

    const user: User = await User
      .query()
      .where('id', params.id)
      .firstOrFail()

    await user.delete()
    return response.ok({
      message: 'User deleted successfully',
    })
  }

  /**
   * @swagger
   * /api/users/{id}:
   *   put:
   *     tags:
   *       - Users
   *     description: Update a user
   *     produces:
   *       - application/json
   *     requestBody:
   *       description: User object
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             $ref: '#/components/schemas/User'
   *     responses:
   *       200:
   *         description: Success
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/User'
   *       406:
   *         description: Not Acceptable
   * @param params
   * @param request
   * @param response
   * @param bouncer
   */
  public async update({ params, request, response, bouncer }: HttpContextContract): Promise<void> {
    await bouncer.with('UserPolicy').authorize('update')

    const updateValidation = schema.create({
      username: schema.string(),
      email: schema.string({}, [
        rules.email(),
      ]),
    })

    const { email, username } = await validator.validate({
      schema: updateValidation,
      data: request.all(),
    })

    const user: User = await User
      .query()
      .where('id', params.id)
      .update({
        email,
        username,
      })
      .firstOrFail()

    return response.ok({
      message: 'User updated successfully',
      user,
    })
  }

  /**
   * @swagger
   * /api/users/{id}/toggle-block:
   *   post:
   *     tags:
   *       - Users
   *     description: Toggle block status of a user
   *     produces:
   *       - application/json
   *     responses:
   *       200:
   *         description: Success
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/User'
   *       406:
   *         description: Not Acceptable
   * @param params
   * @param response
   * @param bouncer
   */
  public async toggleBlock({ params, response, bouncer }: HttpContextContract): Promise<void> {
    await bouncer.with('UserPolicy').authorize('block')

    const user: User = await User
      .query()
      .where('id', params.id)
      .firstOrFail()

    user.is_blocked = !user.is_blocked
    await user.save()

    return response.ok({
      message: 'User updated successfully',
      user,
    })
  }

  /**
   * @swagger
   * /api/users/{id}/login-as:
   *   post:
   *     tags:
   *       - Users
   *     description: Login as a specific user
   *     produces:
   *       - application/json
   *     responses:
   *       200:
   *         description: Success
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 message:
   *                   type: string
   *                   example: 'User logged in successfully'
   *                 token:
   *                   type: string
   *                   example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...'
   *                 user:
   *                   $ref: '#/components/schemas/User'
   *       406:
   *         description: Not Acceptable
   * @param params
   * @param response
   * @param auth
   * @param bouncer
   */
  public async loginAs({ params, response, auth, bouncer }: HttpContextContract): Promise<void> {
    await bouncer.with('UserPolicy').authorize('loginAs')

    const user: User = await User
      .query()
      .preload('roles')
      .where('id', params.id)
      .firstOrFail()

    const { token } = await auth.use('api').login(user)

    return response.ok({
      message: 'User logged in successfully',
      token,
      user,
    })
  }
}
