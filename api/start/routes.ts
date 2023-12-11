/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| This file is dedicated for defining HTTP routes. A single file is enough
| for majority of projects, however you can define routes in different
| files and just make sure to import them inside this file. For example
|
| Define routes in following two files
| ├── start/routes/cart.ts
| ├── start/routes/customer.ts
|
| and then import them inside `start/routes.ts` as follows
|
| import './routes/cart'
| import './routes/customer'
|
*/

import Route from '@ioc:Adonis/Core/Route'
import UsersController from '../app/Controllers/Http/UsersController'

Route.get('/', async () => {
  return { hi: 'coucou from API !' }
})

Route.get('/api/', async () => {
  return { hi: 'the Server is running !' }
})

Route.get('/api/users/profile', async (ctx) => {
  return new UsersController().profile(ctx)
})

Route.post('/api/users/login', async (ctx) => {
  return new UsersController().login(ctx)
})

Route.post('/api/users/logout', async (ctx) => {
  return new UsersController().logout(ctx)
})

Route.post('/api/users/register', async (ctx) => {
  return new UsersController().register(ctx)
})
