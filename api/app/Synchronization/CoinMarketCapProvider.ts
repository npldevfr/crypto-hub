import ProviderFetchException from '../Exceptions/Synchronization/ProviderFetchException'
import { CryptoProvider } from './Generic/CryptoProvider'

interface CoinMarketCapProviderInterface {
  id: number
  name: string
  symbol: string
  slug: string
  num_market_pairs: number
  date_added: string
  tags: string[]
  max_supply: number | null
  circulating_supply: number
  total_supply: number
  infinite_supply: boolean
  platform: string | null
  cmc_rank: number
  self_reported_circulating_supply: number | null
  self_reported_market_cap: number | null
  tvl_ratio: number | null
  last_updated: string
  quote: {
    USD: {
      price: number
      volume_24h: number
      volume_change_24h: number
      percent_change_1h: number
      percent_change_24h: number
      percent_change_7d: number
      percent_change_30d: number
      percent_change_60d: number
      percent_change_90d: number
      market_cap: number
      market_cap_dominance: number
      fully_diluted_market_cap: number
      tvl: number | null
      last_updated: string
    }
  }
}

/**
 * https://coinmarketcap.com/api/documentation/v1/#section/Authentication
 * Has rate limit of 10K calls per month (5 calls per minute, and data is updated every 5 minutes)
 */
export class CoinMarketCapProvider extends CryptoProvider {
  constructor() {
    super({
      name: 'CoinMarketCap',
      frequency: 3000,
      providerURL: 'https://pro-api.coinmarketcap.com',
    })
  }

  public async getData(): Promise<void> {
    try {
      const cmcApiRequest: Response = await fetch(
        `${this.getProviderURL()}/v1/cryptocurrency/listings/latest?limit=100`,
        {
          headers: {
            'X-CMC_PRO_API_KEY': this.getApiKey(),
          },
        },
      )

      const { data: datas } = (await cmcApiRequest.json()) as { data: CoinMarketCapProviderInterface[] }
      const { filteredResults } = await CryptoProvider.getUtils<CoinMarketCapProviderInterface>(datas)

      // Save data to database
      await this.createMany(filteredResults
        .map((crypto: CoinMarketCapProviderInterface) => ({
          change24h: crypto.quote.USD.percent_change_24h,
          price: crypto.quote.USD.price,
          volume24h: crypto.quote.USD.volume_24h,
          marketCap: crypto.quote.USD.market_cap,
          symbol: crypto.symbol,
          lastOriginUpdate: crypto.last_updated,
        })),
      )

      // console.log(data)
    }
    catch (error) {
      throw new ProviderFetchException(this.getName(), error)
    }
  }
}
