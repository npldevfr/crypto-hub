import { DateTime } from 'luxon'
import {BaseModel, column} from '@ioc:Adonis/Lucid/Orm'

export default class Cryptocurrency extends BaseModel {
  @column({ isPrimary: true })
  public id: string

  @column()
  public slug: string

  @column()
  public symbol: string

  @column()
  public name: string

  @column()
  public logo: string

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
