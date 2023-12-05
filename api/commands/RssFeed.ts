import { BaseCommand } from '@adonisjs/core/build/standalone'
import Parser from 'rss-parser'
export default class RssFeed extends BaseCommand {
  /**
   * Command name is used to run the command
   */
  public static commandName = 'rss:feed'

  /**
   * Command description is displayed in the "help" output
   */
  public static description = ''

  public static settings = {
    /**
     * Set the following value to true, if you want to load the application
     * before running the command. Don't forget to call `node ace generate:manifest`
     * afterwards.
     */
    loadApp: false,

    /**
     * Set the following value to true, if you want this command to keep running until
     * you manually decide to exit the process. Don't forget to call
     * `node ace generate:manifest` afterwards.
     */
    stayAlive: false,
  }

  public async run () {
    console.log('Updating RSS feed')
    let parser = new Parser()
    const url = 'https://coinjournal.net/fr/actualites/feed/'
    let feed = await parser.parseURL(url)
    console.log(feed.title)
    feed.items.forEach(item => {
      console.log(item.title + ':' + item.link)
    })
  }
}
