// import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import CryptocurrencyData from '../../Models/CryptocurrencyData'

export default class CryptocurrencyDataController {
  public async index ({ response }) {
    const cryptos = await CryptocurrencyData.query().preload('cryptocurrency')
    return response.json(cryptos)
  }
}
