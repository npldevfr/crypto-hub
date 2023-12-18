// import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import {ModelPaginatorContract} from '@ioc:Adonis/Lucid/Orm'
import User from '../../Models/User'
import {HttpContextContract} from '@ioc:Adonis/Core/HttpContext'

export default class UserManagementsController {
  /**
   * Get all users
   * @param request
   * In the body, you can pass the following parameters:
   * - page: number
   * - perPage: number
   * @returns {Promise<ModelPaginatorContract<User>>}
   */
  public async index ({ request }: HttpContextContract): Promise<ModelPaginatorContract<User>> {
    // We get params from the context request
    const {page, perPage} = request.qs()

    // We return a paginated list of users
    return await User.query().paginate(page, perPage)
  }
}
