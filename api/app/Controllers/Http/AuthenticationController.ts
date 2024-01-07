import Hash from '@ioc:Adonis/Core/Hash'
import { rules, schema, validator } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from '../../Models/User'

export default class AuthenticationController {
  /**
   * @swagger
   * /api/users/profile:
   *   get:
   *     tags:
   *       - Users
   *     description: Get details of the currently logged in user
   *     produces:
   *       - application/json
   *     responses:
   *       200:
   *         description: Success
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/User'
   *       401:
   *         description: Unauthorized
   */
  public async profile({ auth }: HttpContextContract): Promise<User> {
    return await User
      .query()
      .preload('roles')
      .where('id', auth.user?.id)
      .firstOrFail()
  }

  /**
   * @swagger
   * /api/users/login:
   *   post:
   *     tags:
   *       - Users
   *     description: Login user
   *     requestBody:
   *       content:
   *         application/json:
   *           schema:
   *             $ref: '#/components/schemas/Login'
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
   *                 token:
   *                   type: string
   *                 user:
   *                   $ref: '#/components/schemas/User'
   *       401:
   *         description: Unauthorized
   */
  public async login({ auth, request }: HttpContextContract): Promise<{ token: string, user: User }> {
    // Get user input
    const credentialsValidation = schema.create({
      email: schema.string(),
      password: schema.string(),
    })

    // Validate user input and throw validation error if validation fails
    const { email, password } = await request.validate({ schema: credentialsValidation })
    const { token } = await auth.use('api').attempt(email, password)

    // Get user from database
    const user: User = await User
      .query()
      .preload('roles')
      .where('email', email)
      .firstOrFail()

    return { token, user }
  }

  /**
   * @swagger
   * /api/users/logout:
   *   post:
   *     tags:
   *       - Users
   *     description: Logout user
   *     produces:
   *       - application/json
   *     responses:
   *       204:
   *         description: Success
   *       401:
   *         description: Unauthorized
   */
  public async logout({ auth, response }: HttpContextContract): Promise<void> {
    await auth.use('api').revoke()
    return response.noContent()
  }

  /**
   * @swagger
   * /api/users/register:
   *   post:
   *     tags:
   *       - Users
   *     description: Register user
   *     requestBody:
   *       content:
   *         application/json:
   *           schema:
   *             $ref: '#/components/schemas/Register'
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
   *                 token:
   *                   type: string
   *                 user:
   *                   $ref: '#/components/schemas/User'
   *       401:
   *         description: Unauthorized
   */
  public async register({ request, auth }: HttpContextContract) {
    // Get user input for registration
    const registerValidation = schema.create({
      username: schema.string(),
      email: schema.string({}, [
        rules.email(),
      ]),
      password: schema.string({}, [
        rules.confirmed(),
      ]),
    })

    // Validate user input and throw validation error if validation fails
    const { email, password, username } = await validator.validate({
      schema: registerValidation,
      data: request.all(),
    })

    // Create new user
    const user: User = await User.create({
      username,
      email,
      password: await Hash.make(password),
    })

    const { token } = await auth.use('api').attempt(email, password)
    return {
      message: 'User registered successfully',
      token,
      user,
    }
  }

  /**
   * @swagger
   * /api/users/profile:
   *   put:
   *     tags:
   *       - Users
   *     description: Update user profile
   *     requestBody:
   *       content:
   *         application/json:
   *           schema:
   *             $ref: '#/components/schemas/UpdateProfile'
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
   *                 user:
   *                   $ref: '#/components/schemas/User'
   *       401:
   *         description: Unauthorized
   */
  public async update({ auth, request }: HttpContextContract) {
    await auth.use('api').authenticate()

    try {
      const user = auth.user
      user.username = request.input('username') ?? user.username
      user.email = request.input('email') ?? user.email

      const newPassword = request.input('password')

      if (newPassword)
        user.password = await Hash.make(newPassword)

      await user?.save()

      return { message: 'Profile updated successfully', user }
    }
    catch (error) {
      console.error('Profile update error:', error.message)
      return { message: 'Profile update failed' }
    }
  }
}
