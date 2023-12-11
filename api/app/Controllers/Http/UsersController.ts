import Hash from '@ioc:Adonis/Core/Hash'
import User from "../../Models/User"

export default class UsersController {

    public async profile({ auth }) {
        await auth.use('api').authenticate()
        return auth.user!
    }

    public async login({ auth, request }) {
        const email = request.input('email')
        const password = request.input('password')
        return await auth.use('api').attempt(email, password)

    }

    public async logout({ auth }) {
        await auth.use('api').authenticate()
        return await auth.use('api').revoke()
    }

    public async register({ request }) {
        const username = request.input('username')
        const email = request.input('email')
        const password = request.input('password')

        const hashedPassword = await Hash.make(password)
        await User.create({ username, email, password: hashedPassword,});

        return { message: 'Registration successful' };
    }


}
