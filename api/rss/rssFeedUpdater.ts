import Parser from 'rss-parser'

export default class RssFeedUpdater {
  public article = require('App/Models/Article')
  public static async run () {
    console.log('Updating RSS feed')
    let parser = new Parser()
    const url = 'https://coinjournal.net/fr/actualites/feed/'
    let feed = await parser.parseURL(url)
    console.log(feed.title)
    for (const item of feed.items) {
      console.log(item.title + ':' + item.link)
      const article = await this.article?.firstOrCreate({
        name: item.title,
        content: item.contentSnippet,
      })
      console.log(article)
    }
  }
}

