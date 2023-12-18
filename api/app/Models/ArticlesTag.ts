import { DateTime } from 'luxon'
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

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
