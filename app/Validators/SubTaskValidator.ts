import { schema, CustomMessages, rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class SubTaskValidator {
  constructor(protected ctx: HttpContextContract) { }

  public schema = schema.create({
    name: schema.string([rules.minLength(1)]),
    order: schema.number([
      rules.range(1, 1000000)
    ]),
    command: schema.string([rules.minLength(1)]),
      task_id: schema.number([
      rules.exists({ table: 'tasks', column: 'id' })
    ])
  })
  public messages: CustomMessages = {}
}
