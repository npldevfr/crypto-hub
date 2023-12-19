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

  // function to get all rss sources
  public async index({ request }: HttpContextContract): Promise<ArticleSource[]> {
    const { page } = request.qs()
    return await ArticleSource.query().paginate(page, 10)
  }

  // function to get one rss source
  public async show({ params, response }: HttpContextContract): Promise<ArticleSource | null> {
    try {
      return await ArticleSource.findOrFail(params.id)
    }
    catch (e) {
      response.notAcceptable({ error: 'This rss source does not exist' })
      return null
    }
  }

  // function to change active status of a rss source
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

  // function to delete a rss source
  public async destroy({ params, response }: HttpContextContract): Promise<void> {
    try {
      const source = await ArticleSource.findOrFail(params.id)
      await source.delete()
    }
    catch (e) {
      response.notAcceptable({ error: 'This rss source does not exist' })
    }
  }

  // function to add a new rss source
  public async addRssSource({ request }: HttpContextContract): Promise<ArticleSource> {
    const { rssUrl } = await this.validateRssSource(request)
    const check = new RssFeedManager(rssUrl)
    return await check.add_rss_source()
  }

  // function to verify if a rss source is valid
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
