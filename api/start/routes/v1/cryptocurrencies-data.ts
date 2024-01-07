import Route from '@ioc:Adonis/Core/Route'

Route.group((): void => {
  Route.post('cryptocurrencies-data/:slug', 'CryptocurrencyDataController.show')
}).prefix('/api')
