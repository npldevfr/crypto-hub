import type { DateTime } from 'luxon'
import type { BelongsTo } from '@ioc:Adonis/Lucid/Orm'
import { BaseModel, belongsTo, column } from '@ioc:Adonis/Lucid/Orm'

import User from './User'

/**
 * @swagger
 * components:
 *  schemas:
 *    UsersAuthProvider:
 *      type: object
 *      properties:
 *        id:
 *          type: string
 *          format: uuid
 *        refreshToken:
 *          type: string
 *        expiration:
 *          type: string
 *          format: date-time
 *        email:
 *          type: string
 *        username:
 *          type: string
 *        provider:
 *          type: string
 *        provider_id:
 *          type: string
 *        userId:
 *          type: string
 */
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
