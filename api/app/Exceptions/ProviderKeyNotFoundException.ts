import { Exception } from '@adonisjs/core/build/standalone'

/*
|--------------------------------------------------------------------------
| Exception
|--------------------------------------------------------------------------
|
| The Exception class imported from `@adonisjs/core` allows defining
| a status code and error code for every exception.
|
| @example
| new ProviderKeyNotFoundException('message', 500, 'E_RUNTIME_EXCEPTION')
|
*/
export default class ProviderKeyNotFoundException extends Exception {
  constructor (providerName: string) {
    super(`API key for provider ${providerName} not found. Please set CRYPTO_PROVIDER_${providerName.toUpperCase()}_API_KEY in your .env file`, 500, 'E_RUNTIME_EXCEPTION')
  }
}
