import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Database from '@ioc:Adonis/Lucid/Database'


export default class UsersController {
    public async profile(ctx: HttpContextContract) {
        return Database
            .from('users')
            .select('id', 'username', 'email')
    }

    // public async register(ctx: HttpContextContract) {
    //     return Database
    //         .insertQuery() // 👈 gives an instance of insert query builder
    //         .table('users')
    //         .insert({ username: 'virk', email: 'virk@adonisjs.com', password: 'password'})
    //     // return ctx
    // }

}
