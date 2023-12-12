import Parser from 'rss-parser'
import Article from '../app/Models/Article'
import ArticleSource from '../app/Models/ArticleSource'
import NoTitleException from '../app/Exceptions/Rss/NoTilteExeptionException'
import { JSDOM } from 'jsdom'

export default class RssFeedUpdater {
  public static async rssFeedPath () {
    const sources = await ArticleSource.query().where('is_active', true)
    for (const source of sources) {
      await this.insertArticle(source.url, source.id)
    }
  }

  public static async insertArticle (urlRss : string, sourceId : string) {
    let parser = new Parser()
    let feed = await parser.parseURL(urlRss)
    console.log(feed.title)

    try {
      const articlesData = feed.items.map(async item => {
        if (!item.title) {
          throw new NoTitleException()
        }

        const dom = new JSDOM(item['content:encoded'])
        const imageUrl = dom.window.document.querySelector('img')?.getAttribute('src') || 'default_image_url'

        const articleData = {
          slug: this.generateSlug(item.title),
          name: item.title,
          content: item['content:encoded'],
          image_url : imageUrl,
          article_source_id: sourceId,
        }

        const article = await Article.firstOrCreate(articleData)
        return article
      })

      await Promise.all(articlesData)
      console.log('Articles added to the database')
    } catch (error) {
      console.error(error)
    }
  }

  private static generateSlug (title: string): string {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9]/g, '-')
      .replace(/-+/g, '-')
      .replace(/(^-|-$)/g, '')
  }
}
