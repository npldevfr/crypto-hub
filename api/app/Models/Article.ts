import { DateTime } from 'luxon'
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

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
  public article_source_id: string

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
