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
| new NonConformingException('message', 500, 'E_RUNTIME_EXCEPTION')
|
*/
export default class NonConformingException extends Exception {
  constructor() {
    super('Rss feed format not correct', 500, 'E_RUNTIME_EXCEPTION')
  }
}
