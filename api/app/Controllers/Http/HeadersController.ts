// import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import {HttpContextContract} from '@ioc:Adonis/Core/HttpContext'
import Cryptocurrency from '../../Models/Cryptocurrency'

export default class HeadersController {
  /**
   * Transmits the data to the front-end 'header' component
   * with articles, cryptocurrencies and exchanges
   */
  public async index ({}: HttpContextContract) {
    const cryptos: Cryptocurrency[] = await Cryptocurrency.all()
    return {
      cryptocurrencies: cryptos?.splice(0, 6),
      articles: [],
    }
  }
}
