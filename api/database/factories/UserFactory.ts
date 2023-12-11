import User from 'App/Models/User'
import Factory from '@ioc:Adonis/Lucid/Factory'
import Hash from '@ioc:Adonis/Core/Hash'

export default Factory.define(User, async ({faker}) => {
  const username: string = faker.internet.userName()

  return {
    username: username,
    email: faker.internet.email({firstName: username, lastName: ''}),
    avatar: faker.image.avatar(),
    password: await Hash.make('password'),
    is_blocked: false,
  }
}).build()
