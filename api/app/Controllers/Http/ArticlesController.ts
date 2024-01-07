// import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Article from '../../Models/Article'
export default class ArticlesController {

 public async home() {
    const articles: Article[] = await Article.query().orderBy('created_at', 'desc').limit(4)
    
    return articles
    
  }
  public async show({ params, bouncer }: HttpContextContract): Promise<Article> {
    
    const article: Article = await Article.findByOrFail('slug', params.slug)
  
    return article
    
  }

   public async index(): Promise<Article[]> {
    const articles: Article[] = await Article.all()
    
    return articles
  }
}
