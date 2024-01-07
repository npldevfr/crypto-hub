import { BasePolicy } from '@ioc:Adonis/Addons/Bouncer'

export default class UserPolicy extends BasePolicy {
  public async view() {
    return true
    // return user.hasRoles([Roles.ADMINISTRATOR])
  }

  public async viewList() {
    return true
  }

  public async update() {
    return true
  }

  public async destroy() {
    return true
  }

  public async block() {
    return true
  }

  public async loginAs() {
    return true
    // return user.hasRoles([Roles.ADMINISTRATOR])
  }
}
