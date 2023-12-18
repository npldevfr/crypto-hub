import Parser from 'rss-parser'

export class RssVerify {
  private readonly rss_url: string

  constructor (rss_url: string) {
    this.rss_url = rss_url
  }

  public async can_be_converted_to_article (): Promise<boolean> {
    let parser = new Parser()
    try {
      let feed = await parser.parseURL(this.rss_url)
      for (const item of feed.items) {
        if (!item.title || !item['content:encoded']) {
          return false
        }
      }
    } catch (error) {
      console.error(error)
      return false
    }

    return true
  }
}
