import Route from '@ioc:Adonis/Core/Route'

Route.group((): void => {
  Route.resource('cryptocurrencies', 'CryptocurrenciesController')
    .paramFor('cryptocurrencies', 'slug')
    .only(['index', 'show', 'destroy', 'update'])
  Route.post('/cryptocurrencies/create', 'CryptocurrenciesController.create')
}).prefix('/api')
