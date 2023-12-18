import Hash from '@ioc:Adonis/Core/Hash'
import User from '../../Models/User'
import {schema, rules, validator} from '@ioc:Adonis/Core/Validator'
import {HttpContextContract} from '@ioc:Adonis/Core/HttpContext'

export default class AuthenticationController {
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

  public async register ({ request, auth }: HttpContextContract) {
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
    const { email, password, username} = await validator.validate({
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
