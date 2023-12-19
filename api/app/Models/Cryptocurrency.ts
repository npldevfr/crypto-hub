import type { DateTime } from 'luxon'
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

export default class Cryptocurrency extends BaseModel {
  @column({ isPrimary: true, serializeAs: null })
  public id: string

  @column()
  public slug: string

  @column()
  public symbol: string

  @column()
  public name: string

  @column()
  public sequence: number

  @column()
  public logo: string

  @column.dateTime({ autoCreate: true, serializeAs: null })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true, serializeAs: null })
  public updatedAt: DateTime
}
