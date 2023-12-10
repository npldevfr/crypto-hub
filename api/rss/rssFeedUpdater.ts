import Parser from 'rss-parser'
import Article from '../app/Models/Article'

export default class RssFeedUpdater {
  public static async run () {
    console.log('Updating RSS feed')
    let parser = new Parser()
    const url = 'https://coinjournal.net/fr/actualites/feed/'
    let feed = await parser.parseURL(url)
    console.log(feed.title)

    const articlesData = feed.items.map(item => {
      return {
        slug: this.generateSlug(item.title),
        name: item.title,
        content: item.contentSnippet,
      }
    })
    await Article.createMany(articlesData)

    console.log('Articles added to the database')
  }

  private static generateSlug (title: string): string {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9]/g, '-') // Remplacez les caractères non alphanumériques par des tirets
      .replace(/-+/g, '-') // Remplacez plusieurs tirets consécutifs par un seul tiret
      .replace(/(^-|-$)/g, '') // Supprimez les tirets en début et en fin de chaîne
  }
}

