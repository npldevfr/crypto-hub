import type { DateTime } from 'luxon'
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

/**
 * @swagger
 * components:
 *  schemas:
 *    Synchronization:
 *      type: object
 *      properties:
 *        id:
 *          type: number
 *        providerName:
 *          type: string
 *        providerURL:
 *          type: string
 */
export default class Synchronization extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public providerName: string

  @column()
  public providerURL: string

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
