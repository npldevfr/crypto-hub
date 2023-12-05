import Env from '@ioc:Adonis/Core/Env'
import ProviderKeyNotFoundException from '../../Exceptions/ProviderKeyNotFoundException'

interface CryptoProviderInterface {

  /**
   * Time to wait before each new provider call (in ms)
   * private readonly frequency: number (calls per minute)
   **/
  readonly frequency: number
  readonly name: string

  /**
   * Returns data from provider
   * @returns {Promise<any>}
   **/
  getData(): Promise<any>;

  /**
   * Returns number of calls per minute
   * @returns {number}
   **/
  getCallsPerMinute(): number;

  /**
   * Returns provider URL
   * @returns {string}
   **/
  getProviderURL(): string;

  /**
   * Returns provider name
   * @returns {string}
   **/
  getName(): string;

  /**
   * Returns API key
   * Please name your API key as CRYPTO_PROVIDER_{PROVIDER_NAME}_API_KEY
   * @returns {string}
   **/
  getApiKey(): string;

}

interface CryptoProviderConstructorInterface {
  name: string
  frequency: number
  providerURL: string
}

export class CryptoProvider implements CryptoProviderInterface {
  public readonly frequency: number

  public readonly name: string

  private readonly providerURL: string

  constructor ({ frequency, providerURL, name }: CryptoProviderConstructorInterface) {
    this.name = name
    this.frequency = frequency
    this.providerURL = providerURL
  }

  public async getData (): Promise<any> {
    return Promise.resolve('data')
  }

  public getCallsPerMinute (): number {
    return this.frequency
  }

  public getProviderURL (): string {
    return this.providerURL
  }

  public getName (): string {
    return this.name
  }

  public getApiKey (): string {
    const apiKey = Env.get(`CRYPTO_PROVIDER_${this.name.toUpperCase()}_API_KEY`)

    // If API key is not set, throw an exception
    if (!apiKey) {
      throw new ProviderKeyNotFoundException(this.name)
    }

    return apiKey
  }
}

