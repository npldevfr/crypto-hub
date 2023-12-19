import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import UserFactory from '../factories/UserFactory'
import User from '../../app/Models/User'
import Hash from '@ioc:Adonis/Core/Hash'
import Role from '../../app/Models/Role'
import { v4 as uuid } from 'uuid'

export default class extends BaseSeeder {
  public async run (): Promise<void> {
    // Create admin user
    await User.create({
      id: uuid(),
      username: 'admin',
      email: 'admin@gmail.com',
      is_blocked: false,
      password: await Hash.make('admin'),
    })

    // Attach admin role to admin user
    const user = await User.findByOrFail('email', 'admin@gmail.com')
    const adminRole: Role = await Role.findByOrFail('name', 'Administrateur')
    await user.related('roles').attach([adminRole.id])

    // Create 10 users
    await UserFactory.createMany(10)
  }
}
