import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'params'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.integer('sub_task_id').unsigned().references('sub_tasks.id').onDelete('CASCADE').notNullable()

      table.string('name').notNullable()
      table.string('type').notNullable()
      table.boolean('optional').notNullable()
      table.string('default_value')
      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
