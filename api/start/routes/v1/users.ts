import Route from '@ioc:Adonis/Core/Route'

Route.group((): void => {
  /**
   * Manage users (CRUD)
   */
  Route.resource('users', 'UserController')
    .only(['index', 'show', 'destroy', 'update'])

  Route.post('users/:id/toggle-block', 'UserController.toggleBlock')
    .as('users.toggle-block')

  Route.post('users/:id/login-as', 'UserController.loginAs')
    .as('users.login-as')
}).prefix('/api')
  .middleware('auth:api')
