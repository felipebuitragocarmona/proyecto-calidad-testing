import { schema, CustomMessages,rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class UserValidator {
  constructor(protected ctx: HttpContextContract) {}

  public  schema = schema.create({
    name: schema.string([rules.minLength(1)]),
    nick_name:schema.string(),
    email:schema.string([
      rules.email(),
      rules.unique({ table: 'users', column: 'email' ,caseInsensitive: true})
    ])

  })
  public messages: CustomMessages = {}
}
