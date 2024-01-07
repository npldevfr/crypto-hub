// import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Article from '../../Models/Article'
export default class ArticlesController {
  /**
   * @swagger
   * /api/articles-home:
   *   get:
   *     tags:
   *       - Articles
   *     description: Get all articles
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
   *                 $ref: '#/components/schemas/Article'
   */
  public async home() {
    const articles: Article[] = await Article.query().orderBy('created_at', 'desc').limit(4)

    return articles
  }

  /**
   * @swagger
   * /api/articles/{slug}:
   *   get:
   *     tags:
   *       - Articles
   *     description: Get details of a specific article
   *     parameters:
   *       - name: slug
   *         in: path
   *         required: true
   *         schema:
   *           type: string
   *     produces:
   *       - application/json
   *     responses:
   *       200:
   *         description: Success
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/Article'
   *       406:
   *         description: Not Acceptable
   */
  public async show({ params, bouncer }: HttpContextContract): Promise<Article> {
    const article: Article = await Article.findByOrFail('slug', params.slug)

    return article
  }

  /**
   * @swagger
   * /api/articles:
   *   get:
   *     tags:
   *       - Articles
   *     description: Get all articles
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
   *                 $ref: '#/components/schemas/Article'
   */
  public async index(): Promise<Article[]> {
    const articles: Article[] = await Article.all()

    return articles
  }
}
