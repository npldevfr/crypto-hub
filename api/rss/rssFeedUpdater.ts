import Parser from 'rss-parser'
import Article from '../app/Models/Article'
import ArticleSource from '../app/Models/ArticleSource'
import NoTitleException from '../app/Exceptions/Rss/NoTilteExeptionException'

export default class RssFeedUpdater {
  public static async rssFeedPath () {
    const sources = await ArticleSource.all()
    for (const source of sources) {
      await this.insertArticle(source.url, source.id)
    }
  }

  public static async insertArticle (urlRss : string, sourceId : string) {
    let parser = new Parser()
    let feed = await parser.parseURL(urlRss)
    console.log(feed.title)

    try {
      const articlesData = feed.items.map(item => {
        if (!item.title) {
          throw new NoTitleException()
        }
        return {
          slug: this.generateSlug(item.title),
          name: item.title,
          content: item.contentSnippet,
          article_source_id: sourceId,
        }
      })
      await Article.createMany(articlesData)
      console.log('Articles added to the database')
    } catch (error) {
      console.error(error)
    }
  }

  private static generateSlug (title: string): string {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9]/g, '-') // Remplacez les caractères non alphanumériques par des tirets
      .replace(/-+/g, '-') // Remplacez plusieurs tirets consécutifs par un seul tiret
      .replace(/(^-|-$)/g, '') // Supprimez les tirets en début et en fin de chaîne
  }
}

