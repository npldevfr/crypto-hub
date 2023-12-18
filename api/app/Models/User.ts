import { DateTime } from 'luxon'
import { BaseModel, column, manyToMany, ManyToMany } from '@ioc:Adonis/Lucid/Orm'
import Role from './Role'

export default class User extends BaseModel {
  public static selfAssignPrimaryKey = true

  @column({ isPrimary: true })
  public id: string

  @column()
  public username: string

  @column()
  public email: string

  @column({ serializeAs: null })
  public password: string

  @column()
  public avatar: string | null

  @column()
  public is_blocked: boolean

  @column({ serializeAs: null})
  public remember_me_token: string

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true, serializeAs: null })
  public updatedAt: DateTime

  @manyToMany(() => Role, { pivotTable: 'users_roles' })
  public roles: ManyToMany<typeof Role>

  public hasPowerMoreThan (power: number): boolean {
    return this.roles.reduce((hasPower: boolean, role: Role) => {
      return hasPower || role.power > power
    }, false)
  }
}
