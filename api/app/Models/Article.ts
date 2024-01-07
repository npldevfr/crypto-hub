import type { DateTime } from 'luxon'
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

/**
 * @swagger
 * components:
 *  schemas:
 *    Article:
 *      type: object
 *      properties:
 *        id:
 *          type: string
 *          format: uuid
 *        slug:
 *          type: string
 *        name:
 *          type: string
 *        content:
 *          type: string
 *        image_url:
 *          type: string
 *        article_source_id:
 *          type: string
 */
export default class Article extends BaseModel {
  @column({ isPrimary: true })
  public id: string

  @column()
  public slug: string

  @column()
  public name: string

  @column()
  public content: string

  @column()
  public image_url: string

  @column()
  public article_source_id: string

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
