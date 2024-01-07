import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { rules, schema, validator } from '@ioc:Adonis/Core/Validator'
import { RssFeedManager } from '../../../rss/RssFeedManager'
import ArticleSource from '../../Models/ArticleSource'
export default class ArticleSourcesController {
  // Schema for validating the request body
  private readonly rssSourceSchema = schema.create({
    rssUrl: schema.string({ trim: true }, [
      rules.url(),
    ]),
  })

  /**
   * @swagger
   * /api/article-sources:
   *   get:
   *     tags:
   *       - Article Sources
   *     description: Get all RSS sources
   *     produces:
   *       - application/json
   *     responses:
   *       200:
   *         description: Success
   *         content:
   *           application/json:
   *             schema:
   *               type: array
   *               items:
   *                 $ref: '#/components/schemas/ArticleSource'
   */
  public async index({ request }: HttpContextContract): Promise<ArticleSource[]> {
    const { page } = request.qs()
    return await ArticleSource.query().paginate(page, 10)
  }

  /**
   * @swagger
   * /api/article-sources/{id}:
   *   get:
   *     tags:
   *       - Article Sources
   *     description: Get details of a specific RSS source
   *     parameters:
   *       - name: id
   *         in: path
   *         required: true
   *         schema:
   *           type: integer
   *     produces:
   *       - application/json
   *     responses:
   *       200:
   *         description: Success
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/ArticleSource'
   *       406:
   *         description: Not Acceptable
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 error:
   *                   type: string
   *                   example: 'This RSS source does not exist'
   */
  public async show({ params, response }: HttpContextContract): Promise<ArticleSource | null> {
    try {
      return await ArticleSource.findOrFail(params.id)
    }
    catch (e) {
      response.notAcceptable({ error: 'This rss source does not exist' })
      return null
    }
  }

  /**
   * @swagger
   * /api/article-sources/change-active-status/{id}:
   *   patch:
   *     tags:
   *       - Article Sources
   *     description: Change the active status of a specific RSS source
   *     parameters:
   *       - name: id
   *         in: path
   *         required: true
   *         schema:
   *           type: integer
   *     produces:
   *       - application/json
   *     responses:
   *       200:
   *         description: Success
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/ArticleSource'
   *       406:
   *         description: Not Acceptable
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 error:
   *                   type: string
   *                   example: 'This RSS source does not exist'
   */
  public async toggleActiveStatus({ params, response }: HttpContextContract): Promise<ArticleSource | null> {
    try {
      const source = await ArticleSource.findOrFail(params.id)
      source.is_active = !source.is_active
      await source.save()
      return source
    }
    catch (e) {
      response.notAcceptable({ error: 'This rss source does not exist' })
      return null
    }
  }

  /**
   * @swagger
   * /api/article-sources/{id}:
   *   delete:
   *     tags:
   *       - Article Sources
   *     description: Delete a specific RSS source
   *     parameters:
   *       - name: id
   *         in: path
   *         required: true
   *         schema:
   *           type: integer
   *     responses:
   *       204:
   *         description: No Content
   *       406:
   *         description: Not Acceptable
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 error:
   *                   type: string
   *                   example: 'This RSS source does not exist'
   */
  public async destroy({ params, response }: HttpContextContract): Promise<void> {
    try {
      const source = await ArticleSource.findOrFail(params.id)
      await source.delete()
    }
    catch (e) {
      response.notAcceptable({ error: 'This rss source does not exist' })
    }
  }

  /**
   * @swagger
   * /api/article-sources/add-rss-source:
   *   post:
   *     tags:
   *       - Article Sources
   *     description: Add a new RSS source
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           description: RSS source payload
   *           schema:
   *             type: object
   *             properties:
   *               rssUrl:
   *                 type: string
   *                 format: url
   *                 example: 'https://example.com/rss-feed'
   *                 required: true
   *     produces:
   *       - application/json
   *     responses:
   *       200:
   *         description: Success
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/ArticleSource'
   */
  public async addRssSource({ request }: HttpContextContract): Promise<ArticleSource> {
    const { rssUrl } = await this.validateRssSource(request)
    const check = new RssFeedManager(rssUrl)
    return await check.add_rss_source()
  }

  /**
   * @swagger
   * /api/article-sources/verify-rss-source:
   *   post:
   *     tags:
   *       - Article Sources
   *     description: Verify if a specific RSS source is valid
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           description: RSS source payload
   *           schema:
   *             type: object
   *             properties:
   *               rssUrl:
   *                 type: string
   *                 format: url
   *                 example: 'https://example.com/rss-feed'
   *                 required: true
   *     produces:
   *       - application/json
   *     responses:
   *       200:
   *         description: Success
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 isValid:
   *                   type: boolean
   *                   example: true
   *       406:
   *         description: Not Acceptable
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 error:
   *                   type: string
   *                   example: 'This RSS source does not exist'
   */
  public async verifyRssSource({ request }: HttpContextContract): Promise<boolean> {
    const { rssUrl } = await this.validateRssSource(request)
    const check = new RssFeedManager(rssUrl)
    return await check.can_be_converted_to_article()
  }

  // function to validate the request body
  private async validateRssSource(request: HttpContextContract['request']) {
    return await validator.validate({
      schema: this.rssSourceSchema,
      data: request.all(),
    })
  }
}
