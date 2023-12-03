import { schema, CustomMessages,rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class DatumValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    value: schema.string([rules.minLength(1)]),
    param_id:schema.number([
      rules.exists({ table: 'params', column: 'id' })
    ]),    
  })

  public messages: CustomMessages = {}
}
