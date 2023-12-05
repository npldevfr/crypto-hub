import {CryptoProvider} from './CryptoProvider'

export class CryptoEngineAdapter {
  private providers: CryptoProvider[]
  private readonly skipChecks: boolean

  constructor (providers: CryptoProvider[], ignoreCheck: boolean = false) {
    this.providers = providers
    this.skipChecks = ignoreCheck
  }

  public async synchronize (): Promise<void> {
    await Promise.all(
      this.providers
        .map((provider: CryptoProvider) => provider
          .shouldSynchronize(this.skipChecks))
    )
  }
}
