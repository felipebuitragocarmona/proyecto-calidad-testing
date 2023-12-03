import { schema, CustomMessages,rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class RolePermissionValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    role_id:schema.number([
      rules.exists({ table: 'roles', column: 'id' })
    ]),
    permission_id:schema.number([
      rules.exists({ table: 'permissions', column: 'id' })
    ])
  })
  public messages: CustomMessages = {}
}
