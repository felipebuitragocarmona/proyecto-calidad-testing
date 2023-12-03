import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'params'

  public up() {
    this.schema.alterTable(this.tableName, (table) => {
      table.dropForeign('sub_task_id')
      table.dropColumn('sub_task_id')
    })
  }
}
