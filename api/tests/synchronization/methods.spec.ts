import { test } from '@japa/runner'
import { CryptoProvider } from '../../app/Synchronization/Generic/CryptoProvider'
import ProviderKeyNotFoundException from '../../app/Exceptions/Synchronization/ProviderKeyNotFoundException'

test.group('Native methods', async (): Promise<void> => {
  const cryptoProvider: CryptoProvider = new CryptoProvider({
    name: 'CryptoProvider-test',
    frequency: 5000, // every 5 seconds
    providerURL: 'https://www.google.com',
  })

  test('checks if instance is an instance of CryptoProvider', async ({ assert }): Promise<void> => {
    assert.instanceOf(cryptoProvider, CryptoProvider)
  })

  test('checks if getName() returns correct name', async ({ assert }): Promise<void> => {
    assert.equal(cryptoProvider.getName(), 'CryptoProvider-test')
  })

  test('checks if getCallsPerMinute() returns correct frequency', async ({ assert }): Promise<void> => {
    assert.equal(cryptoProvider.getCallsPerMinute(), 5000)
  })

  test('checks if getProviderURL() returns correct URL', async ({ assert }): Promise<void> => {
    assert.equal(cryptoProvider.getProviderURL(), 'https://www.google.com')
  })

  test('checks if getApiKey() returns an error', async ({ assert }): Promise<void> => {
    try {
      cryptoProvider.getApiKey()
    } catch (e) {
      assert.instanceOf(e, ProviderKeyNotFoundException)
    }
  })
})
