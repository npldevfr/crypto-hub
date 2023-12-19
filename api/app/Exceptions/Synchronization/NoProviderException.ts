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
| new NoProviderException('message', 500, 'E_RUNTIME_EXCEPTION')
|
*/
export default class NoProviderException extends Exception {
  constructor() {
    super('You must provide at least one provider', 500, 'E_RUNTIME_EXCEPTION')
  }
}
