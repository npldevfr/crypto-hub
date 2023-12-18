import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { RssVerify } from '../../../rss/RssVerify'
export default class ArticleSourcesController {
  public async verifyRssSource ({ request }: HttpContextContract): Promise<boolean> {
    let rssUrl = request.input('rss_url')
    let verifier = new RssVerify(rssUrl)
    return await verifier.can_be_converted_to_article()
  }
}
