import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'subtask_param'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string("type").checkIn(["input","output"]).notNullable()
      table.integer('subtask_id').unsigned().references('sub_tasks.id').onDelete('CASCADE').notNullable()
      table.integer('param_id').unsigned().references('params.id').onDelete('CASCADE').notNullable()
      
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
