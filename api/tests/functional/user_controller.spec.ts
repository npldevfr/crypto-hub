// import { test } from '@japa/runner'
// import User from '../../app/Models/User'

// test.group('User Controller', async () => {
//   const admin: User = await User.findByOrFail('email', 'admin@gmail.com')
//   // get guest user where roles count is 0
//   const guest = await User.query()
//     .preload('roles', (query) => {
//       query.where('name', '!=', 'admin')
//     })
//     .firstOrFail()
//
//   test('paginated index ')
//     .with([guest, admin])
//     .run(async ({ client, assert, route }, user) => {
//       console.log(user)
//       const response = await client.get(route('users.index')).loginAs(user)
//
//       response.assertStatus(200)
//       assert.properties(response.body(), ['data', 'meta'])
//       assert.isArray(response.body().data)
//       assert.isObject(response.body().meta)
//       assert.onlyProperties(response.body().meta, [
//         'total',
//         'per_page',
//         'current_page',
//         'last_page',
//         'first_page',
//         'first_page_url',
//         'last_page_url',
//         'next_page_url',
//         'previous_page_url',
//       ])
//     })
// })
