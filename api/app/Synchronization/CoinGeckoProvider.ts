import {CryptoProvider} from './Generic/CryptoProvider'

export class CoinGeckoProvider extends CryptoProvider {
  constructor () {
    super(30)
  }

  public async getData (): Promise<any> {
    this.getCallsPerMinute()
    return Promise.resolve('data')
  }
}
