import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'articles_tags'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')

      table.uuid('article_id').references('id').inTable('articles').onDelete('CASCADE')
      table.uuid('tag_id').references('id').inTable('tags').onDelete('CASCADE')

      /**
       * Uses timestamptz for PostgreSQL and DATETIME2 for MSSQL
       */
      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
