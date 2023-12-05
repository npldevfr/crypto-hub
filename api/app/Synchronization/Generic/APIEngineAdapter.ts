import {CryptoProvider} from './CryptoProvider'

export class APIEngineAdapter {
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

  public async synchronizeWithRetry (retryCount: number = 3): Promise<void> {
    let retry = 0
    while (retry < retryCount) {
      try {
        await this.synchronize()
        return
      } catch (e) {
        retry++
      }
    }
  }
}
