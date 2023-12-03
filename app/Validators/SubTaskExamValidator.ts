import { schema, CustomMessages,rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class SubTaskExamValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    exam_id: schema.number([
      rules.exists({ table: 'exams', column: 'id' })
    ]),
    subtask_id: schema.number([
      rules.exists({ table: 'sub_tasks', column: 'id' })
    ])
  })

  public messages: CustomMessages = {}
}
