import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { DateTime } from 'luxon'
import Env from '@ioc:Adonis/Core/Env'
import UsersAuthProvider from '../../Models/UsersAuthProvider'
import User from '../../Models/User'

export default class UsersAuthProvidersController {
  private getAllowedProviders(): string[] {
    return ['google', 'twitter']
  }

  /**
   * @swagger
   * /api/oauth/{provider}/redirect:
   *  get:
   *    tags:
   *      - Authentication
   *    description: Redirect to OAuth provider
   *    produces:
   *      - application/json
   *    responses:
   *      200:
   *        description: Success
   *        content:
   *          application/json:
   *            schema:
   *            type: array
   *            items:
   *              $ref: '#/components/schemas/User'
   *
   * @param ally
   * @param params
   * @param response
   */
  public redirect({ ally, params, response }: HttpContextContract) {
    if (!this.getAllowedProviders().includes(params.provider)) {
      return response.notFound({
        error: `Provider ${params.provider} is not supported`,
      })
    }
    return ally.use(params.provider).stateless().redirect()
  }

  /**
   * @swagger
   * /api/oauth/{provider}/callback:
   *  get:
   *    tags:
   *      - Authentication
   *    description: Callback from OAuth provider
   *    produces:
   *      - application/json
   *    responses:
   *      200:
   *        description: Success
   *        content:
   *          application/json:
   *            schema:
   *            type: array
   *            items:
   *              $ref: '#/components/schemas/User'
   *
   * @param ally
   * @param params
   * @param auth
   * @param response
   */
  public async callback({ ally, params, auth, response }: HttpContextContract) {
    const statelessConnection = await ally.use(params.provider).stateless()
    const socialUser = JSON.parse(
      JSON.stringify(await statelessConnection.user()),
    )

    let userAuthProvider = await UsersAuthProvider.query()
      .preload('user')
      .where('provider_id', socialUser.id)
      .where('provider', params.provider)
      .where('email', socialUser.email)
      .first()

    // await auth.use("api").login(user);

    if (!userAuthProvider) {
      await User.create({
        email: socialUser.email,
        avatar: socialUser.avatarUrl,
        username: socialUser.name,
        password: '',
      })
      const user = await User.query()
        .where('email', socialUser.email)
        .where('username', socialUser.name)
        .firstOrFail()

      userAuthProvider = await UsersAuthProvider.create({
        refreshToken: '',
        expiration: DateTime.local(),
        email: socialUser.email,
        username: socialUser.name,
        provider: params.provider,
        provider_id: socialUser.id,
        userId: user.id,
      })
    }

    const { token } = await auth.use('api').loginViaId(userAuthProvider.userId)

    return response
      .redirect()
      .toPath(Env.get('FRONT_URL').concat(`/login?token=${token}`))
  }
}
