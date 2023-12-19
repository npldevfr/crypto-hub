import Route from '@ioc:Adonis/Core/Route'

  Route.group((): void => {
    // Route.post('/create/', 'CryptocurrenciesController.newCryptocurrency')
    // Route.delete('/delete/', 'CryptocurrenciesController.deleteCryptocurrency')
    Route.put('/update/', 'CryptocurrenciesController.updateCryptocurrency')
    Route.get('/list/', 'CryptocurrenciesController.listCryptocurrencies')
  
  }).prefix('/api/cryptocurrencies')