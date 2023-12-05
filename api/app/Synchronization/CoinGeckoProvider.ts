import {CryptoProvider} from './Generic/CryptoProvider'
import Cryptocurrency from '../Models/Cryptocurrency'
import ProviderFetchException from '../Exceptions/ProviderFetchException'
import CryptocurrencyData from '../Models/CryptocurrencyData'

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

export class CoinGeckoProvider extends CryptoProvider {
  constructor () {
    super({
      name: 'CoinGecko',
      frequency: 30,
      providerURL: 'https://api.coingecko.com/api/v3/coins/markets?vs_currency=eur',
    })
  }

  public async getData (): Promise<void> {
    try {
      // Get all cryptocurrencies from provider
      const data: Response = await fetch(this.getProviderURL())
      const result: CoinGeckoProviderInterface[] = await data.json() as CoinGeckoProviderInterface[]

      // Get all cryptocurrencies that are allowed to be synchronized
      const cryptocurrencies: Cryptocurrency[] = await Cryptocurrency.all()

      // Filter result to only include allowed cryptocurrencies
      const filteredResult: CoinGeckoProviderInterface[] = result
        .filter((crypto: CoinGeckoProviderInterface) => cryptocurrencies
          .map((crypto: Cryptocurrency) => crypto.symbol)
          .includes(crypto.symbol.toUpperCase()))

      // Save data to database
      await CryptocurrencyData.createMany(filteredResult
        .map((crypto: CoinGeckoProviderInterface) => ({
          change24h: crypto.price_change_percentage_24h,
          price: crypto.current_price,
          cryptocurrencyId: cryptocurrencies
            .find((currency: Cryptocurrency): boolean => currency.symbol === crypto.symbol.toUpperCase())?.id,
          marketCap: crypto.market_cap,
          volume24h: crypto.total_volume,
        })))

      for (const crypto of cryptocurrencies) {
        if (crypto.logo === null) {
          const image: string | undefined = filteredResult
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
