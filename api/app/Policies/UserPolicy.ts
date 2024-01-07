import { BasePolicy } from '@ioc:Adonis/Addons/Bouncer'
import type User from 'App/Models/User'
import { Roles } from '../../enums/Roles'

export default class UserPolicy extends BasePolicy {
  public async view(user: User) {
    return user.hasRoles([Roles.ADMINISTRATOR])
  }

  public async viewList(user: User) {
    return user.hasRoles([Roles.ADMINISTRATOR])
  }

  public async update(user: User) {
    return user.hasRoles([Roles.ADMINISTRATOR])
  }

  public async destroy(user: User) {
    return user.hasRoles([Roles.ADMINISTRATOR])
  }

  public async block(user: User) {
    return user.hasRoles([Roles.ADMINISTRATOR])
  }

  public async loginAs(user: User) {
    return user.hasRoles([Roles.ADMINISTRATOR])
  }
}
