import { schema, CustomMessages,rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class PermissionValidator {
  constructor(protected ctx: HttpContextContract) { }
  public schema = schema.create(
    {
      url: schema.string([rules.minLength(1)]),
      method:schema.string([rules.alpha(),
                            rules.minLength(3)])
    }
  )
  public messages: CustomMessages = {}
}
