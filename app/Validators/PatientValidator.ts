import { schema, CustomMessages, rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class PatientValidator {
  constructor(protected ctx: HttpContextContract) { }


  public schema = schema.create({
    name: schema.string([rules.minLength(1)]),
    lastname: schema.string([rules.minLength(1)]),
    birth_year: schema.date({
      format: 'yyyy-MM-dd',
    })

  })

  public messages: CustomMessages = {}
}
