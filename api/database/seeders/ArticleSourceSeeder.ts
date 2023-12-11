import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import ArticleSource from '../../app/Models/ArticleSource'

export default class ArticleSourceSeeder extends BaseSeeder {
  public async run () {
    const data = ([
      {
        'name': 'coinjournalActualites',
        'url': 'https://coinjournal.net/fr/actualites/feed/',
        'is_active': true,
      },
      {
        'name': 'coinacademyActualites',
        'url': 'https://coinacademy.fr/actu/gn',
        'is_active': true,
      },
    ])
    await ArticleSource.createMany(data)
  }
}

