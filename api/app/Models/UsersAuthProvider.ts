import { DateTime } from 'luxon'
import { BaseModel, column, BelongsTo, belongsTo } from '@ioc:Adonis/Lucid/Orm'

import User from './User'

export default class UsersAuthProvider extends BaseModel {
  @column({ isPrimary: true })
  public id: string

  @column({ serializeAs: null })
  public refreshToken: string

  @column.dateTime({ serializeAs: null })
  public expiration: DateTime

  @column({ serializeAs: null })
  public email: string

  @column({ serializeAs: null })
  public username: string

  @column()
  public provider: string

  @column({ serializeAs: null })
  public provider_id: string

  @column({ serializeAs: null })
  public userId: string

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true, serializeAs: null })
  public updatedAt: DateTime

  @belongsTo(() => User)
  public user: BelongsTo<typeof User>

  @belongsTo(() => User)
  public user_id: BelongsTo<typeof User>
}
