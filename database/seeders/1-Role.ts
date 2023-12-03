import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import Role from 'App/Models/Role'

export default class extends BaseSeeder {
  public static environment = ['development', 'test']
  public async run () {
    await Role.createMany([
      {
        name:"Administrador"
      },
      {
        name:"Visitante"
      }
    ])
  }
}
