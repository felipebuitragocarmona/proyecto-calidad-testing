import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'subtask_param'

  public up() {
    this.schema.alterTable(this.tableName, (table) => {
      table.string('default_value')
    })
  }
}
