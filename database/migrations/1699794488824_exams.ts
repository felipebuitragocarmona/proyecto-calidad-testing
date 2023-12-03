import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'exams'

  public up() {
    this.schema.alterTable(this.tableName, (table) => {
      table.integer('process_id').unsigned().references('processes.id')
    })
  }

  // public async down () {
  //   this.schema.alterTable(this.tableName, (table) => {
  //     table.dropColumn('process_id')
  //   })
  // }
}
