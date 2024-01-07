import type { DateTime } from 'luxon'
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

/**
 * @swagger
 * components:
 *   schemas:
 *     Role:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           format: uuid
 *         name:
 *           type: string
 *         key:
 *           type: string
 *         power:
 *           type: number
 */
export default class Role extends BaseModel {
  @column({ isPrimary: true, serializeAs: null })
  public id: string

  @column()
  public name: string

  @column()
  public key: string

  @column({ serializeAs: null })
  public power: number

  @column.dateTime({ autoCreate: true, serializeAs: null })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true, serializeAs: null })
  public updatedAt: DateTime
}
