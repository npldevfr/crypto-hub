import type { DateTime } from 'luxon'
import type {
  HasMany,
  ManyToMany,
  ModelQueryBuilderContract,
} from '@ioc:Adonis/Lucid/Orm'
import {
  BaseModel,
  beforeFind,
  column,
  hasMany,
  manyToMany,
} from '@ioc:Adonis/Lucid/Orm'
import Role from './Role'
import UsersAuthProvider from './UsersAuthProvider'

type UserQuery = ModelQueryBuilderContract<typeof User>

export default class User extends BaseModel {
  public static selfAssignPrimaryKey = true

  @beforeFind()
  public static async beforeFind(query: UserQuery) {
    query.preload('roles')
  }

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

  @column({ serializeAs: null })
  public remember_me_token: string

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true, serializeAs: null })
  public updatedAt: DateTime

  @manyToMany(() => Role, { pivotTable: 'users_roles' })
  public roles: ManyToMany<typeof Role>

  @hasMany(() => UsersAuthProvider)
  public providers: HasMany<typeof UsersAuthProvider>

  public hasRoles(roles: string[]): boolean {
    return this.roles.some((role: Role) => roles.includes(role.name))
  }

  public hasPower(power: number): boolean {
    return this.roles.some((role: Role) => role.power > power)
  }
}
