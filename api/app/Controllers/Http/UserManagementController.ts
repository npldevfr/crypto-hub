// import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import {ModelPaginatorContract} from '@ioc:Adonis/Lucid/Orm'
import User from '../../Models/User'
import {HttpContextContract} from '@ioc:Adonis/Core/HttpContext'

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
}
