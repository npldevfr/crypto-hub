// import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Cache from '@ioc:Adonis/Addons/Adonis5-Cache'
import { CoinGeckoSupplier } from 'App/Synchronization/V1/Suppliers/CoinGeckoSupplier'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { format, subMonths } from 'date-fns'
import Cryptocurrency from 'App/Models/Cryptocurrency'

export default class CryptocurrencyDataController {
  /**
   * @swagger
   * /api/cryptocurrencies-data/{slug}:
   *   get:
   *     tags:
   *       - Cryptocurrencies
   *     description: Get data of a specific cryptocurrency
   *     parameters:
   *       - name: slug
   *         slug: path
   *         required: true
   *         schema:
   *           type: string
   *     produces:
   *       - application/json
   *     responses:
   *       200:
   *         description: Success
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/Cryptocurrency'
   *       404:
   *         description: Not Found
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 error:
   */
  public async show({ params, request }: HttpContextContract) {
    const cachedDateFormat = 'yyyy-MM-dd HH'

    const end = request.body().end_time ? new Date(request.body().end_time) : new Date()
    const start = request.body().start_time ? new Date(request.body().start_time) : subMonths(end, 1)

    const crypto = await Cryptocurrency.findByOrFail('slug', params.slug)
    const cachedCrypto = await Cache.get<{ prices: [number, number][] }>(`cryptocurrency-data-${params.slug}-${format(end, cachedDateFormat)}-${format(start, cachedDateFormat)}`)

    if (cachedCrypto) {
      return {
        ...crypto.serialize(),
        prices: cachedCrypto.prices,
      }
    }

    const supplier = new CoinGeckoSupplier()

    const data = await supplier.getData(
      params.slug,
      supplier.dateToUnix(start),
      supplier.dateToUnix(end),
    )

    await Cache.put(`cryptocurrency-data-${params.slug}-${format(end, cachedDateFormat)}-${format(start, cachedDateFormat)}`, data, 60 * 60 * 24)

    return {
      ...crypto.serialize(),
      prices: data.prices,
    }
  }
}
