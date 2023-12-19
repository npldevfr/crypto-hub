import { DateTime } from 'luxon'
import { BaseModel, column, BelongsTo, belongsTo } from '@ioc:Adonis/Lucid/Orm'

import User from './User'

export default class UsersAuthProvider extends BaseModel {
  @column({ isPrimary: true })
  public id: string

  @column()
  public refreshToken: string

  @column.dateTime()
  public expiration: DateTime

  @column()
  public email: string

  @column()
  public username: string

  @column()
  public provider: string

  @column()
  public provider_id: string

  @column()
  public userId: string

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @belongsTo(() => User)
  public user: BelongsTo<typeof User>
}
