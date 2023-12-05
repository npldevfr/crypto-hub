import { DateTime } from 'luxon'
import {BaseModel, column, BelongsTo,belongsTo} from '@ioc:Adonis/Lucid/Orm'
import Cryptocurrency from './Cryptocurrency'

export default class CryptocurrencyData extends BaseModel {
  @column({ isPrimary: true, serializeAs: null })
  public id: string

  @column()
  public price: number

  @column()
  public marketCap: number

  @column()
  public volume24h: number

  @column()
  public change24h: number

  @column({ serializeAs: null})
  public cryptocurrencyId: string

  @column.dateTime({ autoCreate: true, serializeAs: null })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true, serializeAs: null })
  public updatedAt: DateTime

  @belongsTo(() => Cryptocurrency)
  public cryptocurrency: BelongsTo<typeof Cryptocurrency>
}
