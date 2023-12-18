import Hash from '@ioc:Adonis/Core/Hash'
import User from '../../Models/User'

export default class UsersController {
  public async profile ({ auth }) {
    await auth.use('api').authenticate()
    const user = auth.user!
    return {
      id: user.id,
      username: user.username,
      email: user.email,
      avatar: user.avatar,
      is_blocked: user.is_blocked,
      remember_me_token: user.remember_me_token,
    }
  }

  public async login ({ auth, request }) {
    const email = request.input('email')
    const password = request.input('password')
    return await auth.use('api').attempt(email, password)
  }

  public async logout ({ auth }) {
    await auth.use('api').authenticate()
    await auth.use('api').revoke()
    return { message: 'Logout successful' }
  }

  public async register ({ request }) {
    const username = request.input('username')
    const email = request.input('email')
    const password = request.input('password')

    const hashedPassword = await Hash.make(password)
    const user= await User.findBy('email', email)
    if (!user){
      await User.create({ username, email, password: hashedPassword })
      return { message: 'Registration successful' }
    }
    else{
      return { message: 'An account with this email already exist' }
    }

  }

  public async update ({ auth, request }) {
    await auth.use('api').authenticate()

    try {
      const user = auth.user
      user.username = request.input('username') ?? user.username
      user.email = request.input('email') ?? user.email

      const newPassword = request.input('password')

      if (newPassword) {
        user.password = await Hash.make(newPassword)
      }
      await user.save()

      return { message: 'Profile updated successfully', user }
    } catch (error) {
      console.error('Profile update error:', error.message)
      return { message: 'Profile update failed' }
    }
  }
}
