import {CryptoProvider} from './Generic/CryptoProvider'
import Cryptocurrency from '../Models/Cryptocurrency'
import CryptocurrencyData from '../Models/CryptocurrencyData'
import {DateTime} from 'luxon'
import ProviderFetchException from '../Exceptions/Synchronization/ProviderFetchException'

interface CoinGeckoProviderInterface {
  id: string;
  symbol: string;
  name: string;
  image: string;
  current_price: number;
  market_cap: number;
  market_cap_rank: number;
  fully_diluted_valuation: number;
  total_volume: number;
  high_24h: number;
  low_24h: number;
  price_change_24h: number;
  price_change_percentage_24h: number;
  market_cap_change_24h: number;
  market_cap_change_percentage_24h: number;
  circulating_supply: number;
  total_supply: number;
  max_supply: number | null;
  ath: number;
  ath_change_percentage: number;
  ath_date: string;
  atl: number;
  atl_change_percentage: number;
  atl_date: string;
  roi: number | null;
  last_updated: string;
}

/**
 * https://www.coingecko.com/api/documentation
 * Has rate limit of 30 calls/minute (every 2 seconds)
 */
export class CoinGeckoProvider extends CryptoProvider {
  constructor () {
    super({
      name: 'CoinGecko',
      frequency: 3000, // Every 3 seconds (We want to be safe)
      providerURL: 'https://api.coingecko.com/api/v3/coins/markets?vs_currency=eur',
    })
  }

  public async getData (): Promise<void> {
    try {
      // Get all cryptocurrencies from provider
      const data: Response = await fetch(this.getProviderURL())
      const result: CoinGeckoProviderInterface[] = await data.json() as CoinGeckoProviderInterface[]

      const { cryptocurrencies, filteredResults } =
        await CryptoProvider.getUtils<CoinGeckoProviderInterface>(result)

      // Save data to database
      await CryptocurrencyData.createMany(filteredResults
        .map((crypto: CoinGeckoProviderInterface) => ({
          change24h: crypto.price_change_percentage_24h,
          price: crypto.current_price,
          lastOriginUpdate: DateTime.fromJSDate(new Date(crypto.last_updated)),
          cryptocurrencyId: cryptocurrencies
            .find((currency: Cryptocurrency): boolean => currency.symbol === crypto.symbol.toUpperCase())?.id,
          marketCap: crypto.market_cap,
          volume24h: crypto.total_volume,
        })))

      // Update logo if not set yet
      for (const crypto of cryptocurrencies) {
        if (crypto.logo === null) {
          const image: string | undefined = filteredResults
            .find((currency: CoinGeckoProviderInterface): boolean => currency.symbol.toUpperCase() === crypto.symbol)
            ?.image

          if (image) {
            crypto.logo = image
            await crypto?.save()
          }
        }
      }
    } catch (error) {
      throw new ProviderFetchException(this.getName(), error)
    }
  }
}
