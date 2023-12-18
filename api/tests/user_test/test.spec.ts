import { test } from '@japa/runner'
import User from '../../app/Models/User'

test.group('User', async (): Promise<void> => {

  test('is the test inititate', async ({ client }) => {
    await client.get('/')
  })

  test('The user must not login', async ({ client }) => {
    const admin = { email: 'admin@gmail.com', password: 'wrong-password' }
    const response = await client.post('/api/users/login').form(admin)
    response.assertStatus(400)
  })

  test('can the user login', async ({ client }) => {
    const admin = { email: 'admin@gmail.com', password: 'admin' }
    const response = await client.post('/api/users/login').form(admin)
    response.assertStatus(200)
  })

  test('get the profile of the connected users with the good structure', async ({ client, assert }) => {
    const user = await User.findBy('email', "admin@gmail.com")
    const response = await client.get('/api/users/profile').loginAs(user)
    const body = await response.body()

    const expectedStructure = {
      id: '',
      username: '',
      email: '',
      avatar: null,
      is_blocked: false,
      remember_me_token: null

    };
    response.assertStatus(200)
    const extraFields = Object.keys(body).filter((field) => !(field in expectedStructure));
    assert.deepEqual(extraFields, [], `Unexpected fields found: ${extraFields.join(', ')}`);

    Object.keys(expectedStructure).forEach((field) => { assert.property(body, field); });

  })

})
