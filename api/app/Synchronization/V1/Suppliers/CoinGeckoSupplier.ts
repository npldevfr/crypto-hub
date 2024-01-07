import { GenericSupplier } from 'App/Synchronization/V1/Suppliers/GenericSupplier'

/**
 * https://www.coingecko.com/api/documentation
 * Has rate limit of 30 calls/minute (every 2 seconds)
 */
export class CoinGeckoSupplier extends GenericSupplier {
  constructor() {
    super({
      name: 'CoinGecko',
      frequency: 3000, // Every 3 seconds (We want to be safe)
      providerURL: 'https://api.coingecko.com/api/v3',
    })
  }

  public async getData(currency: string, startDate: string, endDate: string): Promise<any> {
    const data = await fetch(`${this.getProviderURL()}/coins/${currency}/market_chart/range?vs_currency=eur&from=${startDate}&to=${endDate}`)
    return data.json()
  }

  public async getCoins(): Promise<any> {
    const res = await fetch(`${this.getProviderURL()}/coins/markets?vs_currency=eur&order=market_cap_desc&per_page=100&page=1&sparkline=false`)
    return res.json()
  }
}
