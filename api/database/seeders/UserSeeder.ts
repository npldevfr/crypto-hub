import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import UserFactory from '../factories/UserFactory'
import User from '../../app/Models/User'
import Hash from '@ioc:Adonis/Core/Hash'
import Role from "../../app/Models/Role";

export default class extends BaseSeeder {
  public async run(): Promise<void> {
    await User.create({
      username: 'admin',
      email: 'admin@gmail.com',
      is_blocked: false,
      password: await Hash.make('admin'),
    })

    const user = await User.findByOrFail('email', 'admin@gmail.com');
    const adminRole: Role = await Role.findByOrFail('name', 'Administrateur')
    await user.related('roles').attach([adminRole?.id])

    await UserFactory
      .createMany(10)
  }
}
