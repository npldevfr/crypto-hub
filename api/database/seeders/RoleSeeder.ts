import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import Role from '../../app/Models/Role'

export default class extends BaseSeeder {
  public async run (): Promise<void> {
    await Role.createMany([
      {
        name: 'Administrateur',
        power: 1000,
      },
      {
        name: 'Modérateur',
        power: 500,
      },
    ])
  }
}
