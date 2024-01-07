// import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import type { ModelPaginatorContract } from '@ioc:Adonis/Lucid/Orm'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { rules, schema, validator } from '@ioc:Adonis/Core/Validator'
import User from '../../Models/User'

export default class UserController {
  /**
   * Get all users
   * @param {HttpContextContract} ctx
   * In the body, you can pass the following parameters:
   * - page: number
   * - perPage: number
   * @returns {Promise<ModelPaginatorContract<User>>} Users paginated list
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
   * Get user by id
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
   * Get user by id and delete it
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
   * Update user details (email, username) by id
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
   * Toggle user block status
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
   * Login as user
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
