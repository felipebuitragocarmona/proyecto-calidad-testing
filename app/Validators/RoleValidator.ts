import { schema, CustomMessages,rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class SaveRoleValidator {
  constructor(protected ctx: HttpContextContract) {}
  public schema = schema.create({
    name: schema.string([ rules.alpha(),
                          rules.minLength(1),
                          rules.unique({ table: 'roles', column: 'name' ,caseInsensitive: true})])
  })
  public messages: CustomMessages = {}
}
