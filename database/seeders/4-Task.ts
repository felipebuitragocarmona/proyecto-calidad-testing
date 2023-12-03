import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import Task from 'App/Models/Task'

export default class extends BaseSeeder {
  public static environment = ['development', 'test']
  public async run () {
    await Task.createMany([
      {
        name:"Llamado de Bases",
        description:"",
        order:1,
        process_id:1
      },
      {
        name:"Mapeo",
        description:"",
        order:2,
        process_id:1
      },
      {
        name:"Llamado de Variantes",
        description:"",
        order:3,
        process_id:1
      },
      {
        name:"Anotación",
        description:"",
        order:4,
        process_id:1
      }
    ])
  }
}
