import Cryptocurrency from '../../Models/Cryptocurrency'
import Article from '../../Models/Article'

export default class HeadersController {
  /**
   * Transmits the data to the front-end 'header' component
   * with articles, cryptocurrencies and exchanges
   */
  public async index() {
    const cryptos: Cryptocurrency[] = await Cryptocurrency.query().orderBy('sequence', 'asc').limit(6)
    const articles: Article[] = await Article.query().orderBy('created_at', 'desc').limit(4)

    return {
      cryptocurrencies: cryptos,
      articles,
    }
  }
}
