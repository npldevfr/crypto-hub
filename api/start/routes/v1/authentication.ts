import Route from '@ioc:Adonis/Core/Route'

Route.group((): void => {
  /**
   * Authenticated routes (need to be logged in)
   */
  Route.group((): void => {
    Route.get('/profile', 'AuthenticationController.profile')
      .as('profile.show')
    Route.put('/profile', 'AuthenticationController.update')
      .as('profile.update')
    Route.post('/logout', 'AuthenticationController.logout')
      .as('logout')
  }).middleware('auth:api')

  /**
   * Unauthenticated routes (need to be logged out)
   */
  Route.post('/login', 'AuthenticationController.login')
    .as('login')
  Route.post('/register', 'AuthenticationController.register')
    .as('register')
}).prefix('/api/users')
