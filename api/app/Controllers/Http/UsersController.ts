
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
        return await auth.use('api').logout()
    }

}
