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
| new ProviderFetchException('message', 500, 'E_RUNTIME_EXCEPTION')
|
*/
export default class ProviderFetchException extends Exception {
  constructor (provider: string, message: string) {
    super(`An error occured while fetching data from ${provider}: ${message}`, 500, 'E_RUNTIME_EXCEPTION')
  }
}
