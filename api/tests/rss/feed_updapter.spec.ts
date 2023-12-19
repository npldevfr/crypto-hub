import { test } from '@japa/runner'
import Database from '@ioc:Adonis/Lucid/Database'
import RssFeedUpdater from 'Rss/rssFeedUpdater'
import ArticleSource from '../../app/Models/ArticleSource'
import Article from '../../app/Models/Article'

test.group('Feed updapter', async (group) => {
  group.each.setup(async () => {
    await Database.beginGlobalTransaction()
    return () => Database.rollbackGlobalTransaction()
  })

  test('should insert articles from active sources', async ({ assert }) => {
    // Setup
    const source = new ArticleSource()
    source.name = 'Coinacademy'
    source.url = 'https://coinacademy.fr/actu/gn'
    source.is_active = true
    await source.save()

    // Act
    await RssFeedUpdater.rssFeedPath()

    // Assert
    const articles = await Article.query().where('article_source_id', source.id)
    assert.equal(articles.length > 0, true)
  })

  test('should not insert articles from inactive sources', async ({ assert }) => {
    // Setup
    const source = new ArticleSource()
    source.name = 'Coinacademy'
    source.url = 'https://coinacademy.fr/actu/gn'
    source.is_active = false
    await source.save()

    // Act
    await RssFeedUpdater.rssFeedPath()

    // Assert
    const articles = await Article.query().where('article_source_id', source.id)
    assert.equal(articles.length > 0, false)
  })
})
