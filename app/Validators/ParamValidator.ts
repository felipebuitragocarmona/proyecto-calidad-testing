import { schema, CustomMessages,rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class ParamValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    name: schema.string([rules.minLength(1)]),
    sub_task_id: schema.number([
      rules.exists({ table: 'sub_tasks', column: 'id' })
    ]),
    type:schema.string([rules.minLength(1)]),
    optional:schema.boolean(),
    
  })
  public messages: CustomMessages = {}
}
