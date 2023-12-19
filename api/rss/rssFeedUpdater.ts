import Parser from 'rss-parser'
import Article from 'App/Models/Article'
import ArticleSource from 'App/Models/ArticleSource'
import { JSDOM } from 'jsdom'
import NoTitleException from '../app/Exceptions/Rss/NoTilteExeptionException'

export default class RssFeedUpdater {
  // function that get all rss feed path in database and call insertArticle function
  public static async rssFeedPath() {
    const sources = await ArticleSource.query().where('is_active', true)
    for (const source of sources)
      await this.insertArticle(source.url, source.id)
  }

  // function that insert article in database
  public static async insertArticle(urlRss: string, sourceId: string) {
    const parser = new Parser()
    const feed = await parser.parseURL(urlRss)

    try {
      const articlesData = feed.items.map(async (item) => {
        if (!item.title)
          throw new NoTitleException()

        const dom = new JSDOM(item['content:encoded'])
        const imageUrl = dom.window.document.querySelector('img')?.getAttribute('src') || 'default_image_url'

        const articleData = {
          slug: this.generateSlug(item.title),
          name: item.title,
          content: item['content:encoded'],
          image_url: imageUrl,
          article_source_id: sourceId,
        }

        const article = await Article.firstOrCreate(articleData)
        return article
      })

      await Promise.all(articlesData)
    }
    catch (error) {
      console.error(error)
    }
  }

  // function that generate slug for article
  private static generateSlug(title: string): string {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9]/g, '-')
      .replace(/-+/g, '-')
      .replace(/(^-|-$)/g, '')
  }
}
