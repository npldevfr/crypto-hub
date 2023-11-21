import { DateTime } from 'luxon'
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

export default class CryptocurrencyData extends BaseModel {
  @column({ isPrimary: true })
  public id: string

  @column()
  public price: number

  @column()
  public marketCap: string

  @column()
  public volume24h: number

  @column()
  public change24h: number

  @column()
  public cryptocurrencyId: string

  @column()
  public cryptocurrency_providerId: string

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
