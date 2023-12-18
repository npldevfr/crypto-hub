import Route from '@ioc:Adonis/Core/Route'

Route.group((): void => {
  // Users paginated list
  Route.get('/', 'UserManagementController.index')
    .as('users.index')

  // Delete user by id
  Route.delete('/:id', 'UserManagementController.delete')
    .as('users.delete')

  // Update user by id
  Route.put('/:id', 'UserManagementController.update')
    .as('users.update')
}).prefix('/api/users').middleware('auth:api')
