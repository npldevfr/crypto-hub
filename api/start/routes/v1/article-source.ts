import Route from '@ioc:Adonis/Core/Route'

Route.group((): void => {
  /**
   * Manage users (CRUD)
   */
  Route.resource('article-sources', 'ArticleSourcesController')
    .only(['index', 'show', 'destroy'])

  Route.patch('change-active-status/:id', 'ArticleSourcesController.toggleActiveStatus')
    .as('article-sources.change-active-status')
  Route.post('verify-rss-source/', 'ArticleSourcesController.verifyRssSource')
    .as('article-sources.verify-rss-source')
  Route.post('add-rss-source/', 'ArticleSourcesController.addRssSource')
    .as('article-sources.add-rss-source')
}).prefix('/api')
  .middleware('auth:api')
