import Route from '@ioc:Adonis/Core/Route'

import './routes/v1/authentication'
import './routes/v1/users'
import './routes/v1/article-source'

// TODO : remove theses routes under
Route.get('/', async () => {
  return { hi: 'coucou from API !' }
})

Route.get('/api/header-data', 'HeadersController.index')
Route.get('/cryptocurrency-data', 'CryptocurrencyDataController.index')
