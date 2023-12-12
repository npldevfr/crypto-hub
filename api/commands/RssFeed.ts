import { BaseCommand } from '@adonisjs/core/build/standalone'
import RssFeedUpdater from '../rss/rssFeedUpdater'
export default class RssFeed extends BaseCommand {
  /**
   * Command name is used to run the command
   */
  public static commandName = 'rss:feed'

  /**
   * Command description is displayed in the "help" output
   */
  public static description = 'Update RSS feed'

  public static settings = {
    /**
     * Set the following value to true, if you want to load the application
     * before running the command. Don't forget to call `node ace generate:manifest`
     * afterwards.
     */
    loadApp: true,

    /**
     * Set the following value to true, if you want this command to keep running until
     * you manually decide to exit the process. Don't forget to call
     * `node ace generate:manifest` afterwards.
     */
    stayAlive: false,
  }

  public async run () {
    console.log('Updating RSS feed')
    await RssFeedUpdater.rssFeedPath()
  }
}
