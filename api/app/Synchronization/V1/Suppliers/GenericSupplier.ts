import Env from '@ioc:Adonis/Core/Env'
import ProviderKeyNotFoundException from 'App/Exceptions/Synchronization/ProviderKeyNotFoundException'
import { format } from 'date-fns'

export class GenericSupplier {
  public readonly frequency: number

  public readonly name: string

  private readonly providerURL: string

  constructor({ frequency, providerURL, name }) {
    this.name = name
    this.frequency = frequency
    this.providerURL = providerURL
  }

  public async getData(currency: string, startDate: string, endDate: string): Promise<any> {
    return Promise.resolve({ currency, startDate, endDate })
  }

  public getCallsPerMinute(): number {
    return this.frequency
  }

  public getProviderURL(): string {
    return this.providerURL
  }

  public getName(): string {
    return this.name
  }

  /**
   * Returns API key
   * Please name your API key as CRYPTO_PROVIDER_{PROVIDER_NAME}_API_KEY
   */
  public getApiKey(): string {
    const apiKey = Env.get(`CRYPTO_PROVIDER_${this.name.toUpperCase()}_API_KEY`)

    // If API key is not set, throw an exception
    if (!apiKey)
      throw new ProviderKeyNotFoundException(this.name)

    return apiKey
  }

  public dateToUnix(date: Date): string {
    return format(date, 't')
  }
}
