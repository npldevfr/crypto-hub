import { test } from '@japa/runner'
import User from '../../app/Models/User'

test.group('User', async (): Promise<void> => {
  async function updateUserProfile(client, property: string, value: string, assert) {
    const user = await User.findBy('email', 'admin@gmail.com')

    const modificationForm = { [property]: value }
    const response = await client.put('/api/profile').form(modificationForm).loginAs(user)
    response.assertStatus(200)
    assert.equal(response.body().message, 'Profile updated successfully')
  }

  test('is the test inititate', async ({ client }) => {
    await client.get('/')
  })

  test('The user must not login', async ({ client }) => {
    const admin = { email: 'admin@gmail.com', password: 'wrong-password' }
    const response = await client.post('/api/login').form(admin)
    response.assertStatus(400)
  })

  test('can the user login', async ({ client }) => {
    const admin = { email: 'admin@gmail.com', password: 'admin' }
    const response = await client.post('/api/login').form(admin)
    response.assertStatus(200)
  })

  test('get the profile of the connected users with the good structure', async ({ client, assert }) => {
    const user = await User.findByOrFail('email', 'admin@gmail.com')
    const response = await client.get('/api/profile').loginAs(user)
    const body = await response.body()

    const expectedStructure = {
      id: '',
      username: '',
      email: '',
      avatar: null,
      is_blocked: false,
      created_at: new Date(),
      roles: '',
    }
    response.assertStatus(200)
    const extraFields = Object.keys(body).filter(field => !(field in expectedStructure))
    assert.deepEqual(extraFields, [], `Unexpected fields found: ${extraFields.join(', ')}`)

    Object.keys(expectedStructure).forEach((field) => {
      assert.property(body, field)
    })
  })
  test('can the user logout', async ({ client }) => {
    const user = await User.findByOrFail('email', 'admin@gmail.com')
    await client.post('/api/logout').loginAs(user)
  })

  test('can a person register', async ({ client, assert }) => {
    const registrationForm = {
      username: 'test',
      email: 'test@gmail.com',
      password: 'password',
      password_confirmation: 'password',
    }
    const response = await client.post('/api/register').form(registrationForm)
    response.assertStatus(200)
    assert.equal(response.body().message, 'User registered successfully')
  })

  // test('A person register with an existing email', async ({ client, assert }) => {
  //   const registrationForm = {
  //     "username": "admintest",
  //     "email": "admin@gmail.com",
  //     "password": "password"
  //   }
  //   const response = await client.post('/api/users/register').form(registrationForm)
  //   response.assertStatus(200)
  //   assert.equal(response.body().message, 'An account with this email already exist')
  // })

  test('can the user update his username', async ({ client, assert }) => {
    await updateUserProfile(client, 'username', 'administrator', assert)
  })

  test('can the user update his email', async ({ client, assert }) => {
    await updateUserProfile(client, 'email', 'admin@gmail.com', assert)
  })

  test('can the user update his password', async ({ client, assert }) => {
    await updateUserProfile(client, 'password', 'admin', assert)
  })
})
