import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'datum_sub_task_exam'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string("type").checkIn(["input","output"]).notNullable()
      table.integer('subtask_exam_id').unsigned().references('subtask_exam.id').onDelete('CASCADE').notNullable()
      table.integer('datum_id').unsigned().references('data.id').onDelete('CASCADE').notNullable()
      

      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
