import { test } from '@japa/runner'
import {CryptoEngineAdapter} from '../../app/Synchronization/Generic/CryptoEngineAdapter'
import NoProviderException from '../../app/Exceptions/Synchronization/NoProviderException'
import {CoinGeckoProvider} from '../../app/Synchronization/CoinGeckoProvider'
import CryptocurrencyData from '../../app/Models/CryptocurrencyData'
import Database from '@ioc:Adonis/Lucid/Database'

test.group('Synchronisation', async (group): Promise<void> => {
  group.each.setup(async (): Promise<(() => Promise<void>)> => {
    await Database.beginGlobalTransaction()
    return () => Database.rollbackGlobalTransaction()
  })

  test('cannot call synchronize without providers', async ({ assert }): Promise<void> => {
    const cea: CryptoEngineAdapter = new CryptoEngineAdapter([])

    assert.equal(cea.canSynchronize(), false)
  })

  test('try to synchronize without providers', async ({ assert }): Promise<void> => {
    const cea: CryptoEngineAdapter = new CryptoEngineAdapter([])

    try {
      await cea.synchronize()
    } catch (e) {
      assert.instanceOf(e, NoProviderException)
    }
  })

  test('can call synchronize with providers', async ({ assert }): Promise<void> => {
    const cea: CryptoEngineAdapter = new CryptoEngineAdapter([
      new CoinGeckoProvider(),
    ])

    assert.equal(cea.canSynchronize(), true)
  })

  test('try to synchronize with providers and get data from provider', async ({ assert }): Promise<void> => {
    const cea: CryptoEngineAdapter = new CryptoEngineAdapter([
      new CoinGeckoProvider(),
    ])

    await cea.synchronize()
    const cryptocurrencyData: CryptocurrencyData[] = await CryptocurrencyData.all()
    assert.lengthOf(cryptocurrencyData, 10)
  })
})
