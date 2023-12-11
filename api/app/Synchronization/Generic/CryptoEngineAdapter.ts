import {CryptoProvider} from './CryptoProvider'
import NoProviderException from '../../Exceptions/Synchronization/NoProviderException'

export class CryptoEngineAdapter {
  private providers: CryptoProvider[]
  private readonly skipChecks: boolean

  constructor (providers: CryptoProvider[], ignoreCheck: boolean = false) {
    this.providers = providers
    this.skipChecks = ignoreCheck
  }

  public async synchronize (): Promise<void | NoProviderException> {
    if (this.providers.length === 0) {
      throw new NoProviderException()
    }

    await Promise.all(
      this.providers
        .map((provider: CryptoProvider) => provider
          .shouldSynchronize(this.skipChecks))
    )
  }

  public canSynchronize (): boolean {
    return this.providers.length > 0
  }
}
