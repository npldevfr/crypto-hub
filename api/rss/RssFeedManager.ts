import Parser from 'rss-parser'
import ArticleSource from '../app/Models/ArticleSource'
import NonConformingException from '../app/Exceptions/Rss/NonConformingException'

export class RssFeedManager {
  private readonly rss_url: string

  constructor(rss_url: string) {
    this.rss_url = rss_url
  }

  public async can_be_converted_to_article(): Promise<boolean> {
    const parser = new Parser()
    try {
      const feed = await parser.parseURL(this.rss_url)
      for (const item of feed.items) {
        if (!item.title || !item['content:encoded'])
          return false
      }
    }
    catch (error) {
      console.error(error)
      return false
    }

    return true
  }

  public async add_rss_source(): Promise<ArticleSource> {
    if (!await this.can_be_converted_to_article())
      throw new NonConformingException()

    const parser = new Parser()
    const feed = await parser.parseURL(this.rss_url)
    const sourceData = {
      name: feed.title,
      url: this.rss_url,
      is_active: true,
    }
    return await ArticleSource.firstOrCreate(sourceData)
  }
}
