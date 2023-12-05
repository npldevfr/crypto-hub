import {CryptoProvider} from './CryptoProvider'

export class CryptoEngineAdapter {
  private providers: CryptoProvider[]

  constructor (providers: CryptoProvider[]) {
    this.providers = providers
  }

  public async synchronize (): Promise<void> {
    await Promise.all(
      this.providers
        .map((provider: CryptoProvider) => provider.getData())
    )
  }
}
