import {CryptoProvider} from './Generic/CryptoProvider'

export class DataSynchronizer {
  private providers: CryptoProvider[]

  constructor (providers: CryptoProvider[]) {
    this.providers = providers
  }

  public async synchronize (): Promise<void> {
    const data: any[] = await Promise.all(this.providers.map((provider: CryptoProvider) => provider.getData()))
    return data.reduce((acc, curr) => {
      acc.push(...curr)
      return acc
    }, [])
  }
}
