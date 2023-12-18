import Env from '@ioc:Adonis/Core/Env'
import {DateTime} from 'luxon'
import ProviderKeyNotFoundException from '../../Exceptions/Synchronization/ProviderKeyNotFoundException'
import Synchronization from 'App/Models/Synchronization'
import Cryptocurrency from 'App/Models/Cryptocurrency'
import CryptocurrencyData from 'App/Models/CryptocurrencyData'

interface CryptoProviderInterface {

  /**
   * Time to wait before each new provider call (in ms)
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

interface CryptoDataCreationInterface {
  change24h: number
  price: number
  volume24h: number
  marketCap: number
  symbol: string
  lastOriginUpdate: string
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
    return Promise.resolve()
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

  /**
   * Returns API key
   * Please name your API key as CRYPTO_PROVIDER_{PROVIDER_NAME}_API_KEY
   */
  public getApiKey (): string {
    const apiKey = Env.get(`CRYPTO_PROVIDER_${this.name.toUpperCase()}_API_KEY`)

    // If API key is not set, throw an exception
    if (!apiKey) {
      throw new ProviderKeyNotFoundException(this.name)
    }

    return apiKey
  }

  /**
   * Checks if synchronization is needed
   * @returns {Promise<boolean>}
   */
  private async isSynchronizationNeeded (): Promise<boolean> {
    const lastSynchronization: Synchronization | null = await Synchronization.query()
      .where('providerURL', this.getProviderURL())
      .where('providerName', this.getName())
      .orderBy('createdAt', 'desc')
      .first()

    if (!lastSynchronization) {
      return true
    }

    const now: Date = new Date()
    const lastSynchronizationDate: Date = lastSynchronization.createdAt.toJSDate()
    const can: boolean = now.getTime() > lastSynchronizationDate.getTime() + this.getCallsPerMinute()

    // console.log(`Synchronization ${can ? 'needed' : 'not needed'} for ${this.getName()}`)
    return can
  }

  /**
   * Synchronizes data from provider with checks
   * @param {boolean} ignoreChecks
   * @returns {Promise<void>}
   */
  public async shouldSynchronize (ignoreChecks: boolean = false): Promise<void> {
    if (ignoreChecks || await this.isSynchronizationNeeded()) {
      await this.getData()
      await this.saveSynchronizationHistory()
    }
  }

  /**
   * Saves synchronization history to database
   * @returns {Promise<void>}
   */
  public async saveSynchronizationHistory (): Promise<void> {
    await Synchronization.create({
      providerURL: this.getProviderURL(),
      providerName: this.getName(),
    })
  }

  /**
   * Collection of utilities for providers
   */
  public static async getUtils<T extends { symbol: string }>(datas: T[] = []) {
    // Get all cryptocurrencies from database
    const cryptocurrencies: Cryptocurrency[] = await Cryptocurrency.all()

    // Filter results to get only the available cryptocurrencies in database
    const filteredResults: T[] = datas
      .filter((crypto: T) => cryptocurrencies
        .map((crypto: Cryptocurrency) => crypto.symbol)
        .includes(crypto.symbol.toUpperCase()))

    return {
      cryptocurrencies,
      filteredResults,
    }
  }

  public async createMany (data: CryptoDataCreationInterface[]): Promise<any> {
    const {cryptocurrencies} = await CryptoProvider.getUtils()

    await CryptocurrencyData.createMany(data
      .map((crypto: CryptoDataCreationInterface) => ({
        change24h: crypto.change24h,
        price: crypto.price,
        lastOriginUpdate: DateTime.fromJSDate(new Date(crypto.lastOriginUpdate)),
        cryptocurrencyId: cryptocurrencies
          .find((currency: Cryptocurrency): boolean => currency.symbol === crypto.symbol.toUpperCase())?.id,
        marketCap: crypto.marketCap,
        volume24h: crypto.volume24h,
      })))
  }
}

