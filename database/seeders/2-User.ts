import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import User from 'App/Models/User'

export default class extends BaseSeeder {
  public static environment = ['development', 'test']
  public async run () {
    await User.createMany([
      {
        name:"Felipe",
        nick_name: "felipebc",
        email:"felipe.buitrago@ucaldas.edu.co",
        role_id:1
      },
      {
        name:"Felipe Prueba",
        nick_name: "felipebc-prueba",
        email:"felipebuitragocarmona@gmail.com",
        role_id:2
      }
    ])
  }
}
