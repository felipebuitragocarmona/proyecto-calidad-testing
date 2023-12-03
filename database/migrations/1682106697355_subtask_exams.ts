import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'subtask_exam'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.integer('previous_subtask_exam_id').unsigned().references('subtask_exam.id').onDelete('CASCADE')
      table.integer('exam_id').unsigned().references('exams.id').onDelete('CASCADE').notNullable()
      table.integer('subtask_id').unsigned().references('sub_tasks.id').onDelete('CASCADE').notNullable()
      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
      table.timestamp('finished_at')
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
