import { schema, CustomMessages, rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class DatumSubTaskExamValidator {
  constructor(protected ctx: HttpContextContract) { }
  public schema = schema.create(
    {
      type: schema.string([rules.required()]),
      subtask_exam_id: schema.number([
        rules.exists({ table: 'subtask_exam', column: 'id' })
      ]),
      datum_id: schema.number([
        rules.exists({ table: 'data', column: 'id' })
      ]),
    },

  )
  public messages: CustomMessages = {}
}
