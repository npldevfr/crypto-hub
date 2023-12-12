import { test } from '@japa/runner'

test.group('User', async (): Promise<void> => {

  test('is the test inititate', async ({ client }) => {
    await client.get('/')
  })

  test('The user must not login', async ({ client/*, assert*/ }) => {
    const admin = { email: 'admin@gmail.com', password: 'wrong-password' }
    const response = await client.post('/api/users/login').form(admin)
    response.assertStatus(400)
    // console.log(response.body())
  })

  test('can the user login', async ({ client/*, assert*/ }) => {
    const admin = { email: 'admin@gmail.com', password: 'admin' }
    const response = await client.post('/api/users/login').form(admin)
    response.assertStatus(200)
  })
})
