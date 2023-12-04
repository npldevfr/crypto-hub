interface CryptoProviderInterface {

  /**
   * Time to wait before each new provider call (in ms)
   * @type {number}
   **/
  readonly callsPerMinute: number;

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

}

export class CryptoProvider implements CryptoProviderInterface {
  private readonly callsPerMinute: number

  constructor (callsPerMinute: number = 10) {
    this.callsPerMinute = callsPerMinute
  }

  public async getData (): Promise<any> {
    return Promise.resolve('data')
  }

  public getCallsPerMinute (): number {
    return this.callsPerMinute
  }
}

