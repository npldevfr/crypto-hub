import { BasePolicy } from '@ioc:Adonis/Addons/Bouncer'
import type User from 'App/Models/User'

export default class UserPolicy extends BasePolicy {
  public async view(user: User) {
    return user.hasRoles(['administrator'])
  }

  public async viewList(user: User) {
    return user.hasRoles(['administrator'])
  }

  public async update(user: User) {
    return user.hasRoles(['administrator'])
  }

  public async destroy(user: User) {
    return user.hasRoles(['administrator'])
  }

  public async block(user: User) {
    return user.hasRoles(['administrator'])
  }

  public async loginAs(user: User) {
    return user.hasRoles(['administrator'])
  }
}
