import { schema, CustomMessages,rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class PatientCreateValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    document: schema.string([rules.minLength(1),
                             rules.alphaNum(),
                             rules.unique({ table: 'patients', column: 'document' ,caseInsensitive: true})]),
    name: schema.string([rules.minLength(1)]),
    lastname: schema.string([rules.minLength(1)]),
    birth_year: schema.date({
      format: 'yyyy-MM-dd',
    })

  })


  public messages: CustomMessages = {}
}
