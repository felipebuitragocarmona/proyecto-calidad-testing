import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import RolePermission from 'App/Models/RolePermission'

export default class extends BaseSeeder {

  public static environment = ['development', 'test']
  public async run () {
    await RolePermission.createMany([
      {
        role_id: 1,
        permission_id:1
      },
      {
        role_id: 1,
        permission_id:2
      }
    ])
  }
}
