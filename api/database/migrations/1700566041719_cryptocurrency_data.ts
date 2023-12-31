import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'cryptocurrency_data'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table
        .uuid('id')
        .primary()
        .defaultTo(this.db.rawQuery('uuid_generate_v4()').knexQuery)

      table.float('price').defaultTo(0)
      table.float('market_cap').notNullable()
      table.float('volume24h').defaultTo(0)
      table.float('change24h').defaultTo(0)
      table.dateTime('last_origin_update').notNullable()
      table.uuid('cryptocurrency_id').references('id').inTable('cryptocurrencies').onDelete('CASCADE')

      /**
       * Uses timestamptz for PostgreSQL and DATETIME2 for MSSQL
       */
      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
