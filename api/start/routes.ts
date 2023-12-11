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
Route.group(() => {
  Route.get('/profile', async (ctx) => {
    return new UsersController().profile(ctx)
  })

  Route.post('/login', async (ctx) => {
    return new UsersController().login(ctx)
  })

  Route.post('/logout', async (ctx) => {
    return new UsersController().logout(ctx)
  })

  Route.post('/register', async (ctx) => {
    return new UsersController().register(ctx)
  })

  Route.put('/profile', async (ctx) => {
    return new UsersController().update(ctx)
  })
}).prefix('/api/users')

Route.get('/', async () => {
  return { hi: 'coucou from API !' }
})

Route.get('/api', async () => {
  return { hi: 'the Server is running !' }
})


