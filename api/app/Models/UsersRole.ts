import type { DateTime } from 'luxon'
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

/**
 * @swagger
 * components:
 *  schemas:
 *    UsersRole:
 *      type: object
 *      properties:
 *        id:
 *          type: string
 *          format: uuid
 *        userId:
 *          type: string
 *        roleId:
 *          type: string
 */
export default class UsersRole extends BaseModel {
  @column({ isPrimary: true })
  public id: string

  @column()
  public userId: string

  @column()
  public roleId: string

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
