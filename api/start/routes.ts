import Route from '@ioc:Adonis/Core/Route'

import './routes/v1/authentication'
import './routes/v1/users'
import './routes/v1/cryptocurrencies'
import './routes/v1/article-source'

// TODO : remove theses routes under
Route.get('/', async () => {
  return { hi: 'coucou from API !' }
})

Route.get('/api/header-data', 'HeadersController.index')

Route.get('/api/articles-home', 'ArticlesController.home')
Route.get('/api/article/:slug', 'ArticlesController.show')
Route.get('/api/articles/', 'ArticlesController.index')

Route.get('/cryptocurrency-data', 'CryptocurrencyDataController.index')

Route.get('oauth/:provider/redirect', 'UsersAuthProvidersController.redirect')

Route.get('oauth/:provider/callback', 'UsersAuthProvidersController.callback')
