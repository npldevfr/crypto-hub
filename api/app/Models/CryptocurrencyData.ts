import type { DateTime } from 'luxon'
import type { BelongsTo } from '@ioc:Adonis/Lucid/Orm'
import { BaseModel, belongsTo, column } from '@ioc:Adonis/Lucid/Orm'
import Cryptocurrency from 'App/Models/Cryptocurrency'

/**
 * @swagger
 * components:
 *   schemas:
 *     CryptocurrencyData:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           format: uuid
 *         price:
 *           type: number
 *         marketCap:
 *           type: number
 *         volume24h:
 *           type: number
 *         change24h:
 *           type: number
 *         lastOriginUpdate:
 *           type: string
 *           format: date-time
 *         cryptocurrencyId:
 *           type: string
 *           format: uuid
 */
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

  @column()
  public lastOriginUpdate: DateTime

  @column({ serializeAs: null })
  public cryptocurrencyId: string

  @column.dateTime({ autoCreate: true, serializeAs: null })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true, serializeAs: null })
  public updatedAt: DateTime

  @belongsTo(() => Cryptocurrency)
  public cryptocurrency: BelongsTo<typeof Cryptocurrency>
}
