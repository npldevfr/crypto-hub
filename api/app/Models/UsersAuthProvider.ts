import { DateTime } from 'luxon'
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

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
  public userId: string

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true, serializeAs: null })
  public updatedAt: DateTime
}
