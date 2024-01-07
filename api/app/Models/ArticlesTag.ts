import type { DateTime } from 'luxon'
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

/**
 * @swagger
 * components:
 *  schemas:
 *    ArticlesTag:
 *      type: object
 *      properties:
 *        id:
 *          type: string
 *          format: uuid
 *        articleId:
 *          type: string
 *        tagId:
 *          type: string
 */
export default class ArticlesTag extends BaseModel {
  @column({ isPrimary: true })
  public id: string

  @column()
  public articleId: string

  @column()
  public tagId: string

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
