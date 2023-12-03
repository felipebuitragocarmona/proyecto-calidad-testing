import { schema, CustomMessages,rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class ExamValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    name: schema.string([rules.minLength(1)]),
    patient_id:schema.number([
      rules.exists({ table: 'patients', column: 'id' })
    ]),
  })

  public messages: CustomMessages = {}
}
