import {CryptoProvider} from './Generic/CryptoProvider'

export class CoinGeckoProvider extends CryptoProvider {
  constructor () {
    super({
      name: 'CoinGecko',
      frequency: 30,
      providerURL: 'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1&sparkline=false',
    })
  }

  public async getData (): Promise<any> {
    return Promise.resolve('data')
  }
}
