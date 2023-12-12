import Hash from '@ioc:Adonis/Core/Hash'
import User from '../../Models/User'
import {schema} from '@ioc:Adonis/Core/Validator'
import {HttpContextContract} from '@ioc:Adonis/Core/HttpContext'

export default class UsersController {
  public async profile ({ auth }: HttpContextContract): Promise<User> {
    return await User
      .query()
      .preload('roles')
      .where('id', auth.user?.id)
      .firstOrFail()
  }

  public async login ({ auth, request }: HttpContextContract): Promise<{ token: string, user: User }> {
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

  public async logout ({ auth, response}: HttpContextContract): Promise<void> {
    await auth.use('api').revoke()
    return response.noContent()
  }

  public async register ({ request }) {
    const username = request.input('username')
    const email = request.input('email')
    const password = request.input('password')

    const hashedPassword = await Hash.make(password)
    await User.create({ username, email, password: hashedPassword })

    return { message: 'Registration successful' }
  }

  public async update ({ auth, request }: HttpContextContract){
    await auth.use('api').authenticate()

    try {
      const user = auth.user
      user.username = request.input('username') ?? user.username
      user.email = request.input('email') ?? user.email

      const newPassword = request.input('password')

      if (newPassword) {
        user.password = await Hash.make(newPassword)
      }
      await user?.save()

      return { message: 'Profile updated successfully', user }
    } catch (error) {
      console.error('Profile update error:', error.message)
      return { message: 'Profile update failed' }
    }
  }
}
