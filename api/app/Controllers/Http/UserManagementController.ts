// import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import {ModelPaginatorContract} from '@ioc:Adonis/Lucid/Orm'
import User from '../../Models/User'
import {HttpContextContract} from '@ioc:Adonis/Core/HttpContext'
import {rules, schema, validator} from '@ioc:Adonis/Core/Validator'

export default class UserManagementController {
  /**
   * Get all users
   * @param request
   * In the body, you can pass the following parameters:
   * - page: number
   * - perPage: number
   * @returns {Promise<ModelPaginatorContract<User>>}
   */
  public async index ({ request }: HttpContextContract): Promise<ModelPaginatorContract<User>> {
    const { page, perPage, sortBy, sortDirection, query } = request.qs()

    let usersQuery = User.query().preload('roles')

    // If search query is present and has more than 2 characters, apply search filter
    if (query && query.length > 2) {
      usersQuery = usersQuery
        .whereILike('email',`%${query}%`)
        .orWhereILike('username', `%${query}%`)
        .orWhereHas('roles', (builder) => {
          builder.whereILike('name', `%${query}%`)
        })
    }

    // Apply sorting and pagination
    return await usersQuery.orderBy(sortBy || 'email', sortDirection || 'asc').paginate(page || 1, perPage || 10)
  }

  /**
   * Get user by id
   */
  public async show ({ params }: HttpContextContract): Promise<User> {
    return await User
      .query()
      .preload('roles')
      .where('id', params.id)
      .firstOrFail()
  }

  /**
   * Get user by id and delete it
   */
  public async destroy ({ params, response }: HttpContextContract): Promise<void> {
    const user: User = await User
      .query()
      .where('id', params.id)
      .firstOrFail()

    await user.delete()
    return response.ok({
      message: 'User deleted successfully',
    })
  }

  /**
   * Update user details (email, username) by id
   */
  public async update ({ params, request, response }: HttpContextContract): Promise<void> {
    const updateValidation = schema.create({
      username: schema.string(),
      email: schema.string({}, [
        rules.email(),
      ]),
    })

    const { email, username} = await validator.validate({
      schema: updateValidation,
      data: request.all(),
    })

    const user: User = await User
      .query()
      .where('id', params.id)
      .update({
        email,
        username,
      })
      .firstOrFail()

    return response.ok({
      message: 'User updated successfully',
      user,
    })
  }

  /**
   * Toggle user block status
   */
  public async toggleBlock ({ params, response }: HttpContextContract): Promise<void> {
    const user: User = await User
      .query()
      .where('id', params.id)
      .firstOrFail()

    user.is_blocked = !user.is_blocked
    await user.save()

    return response.ok({
      message: 'User updated successfully',
      user,
    })
  }
}
