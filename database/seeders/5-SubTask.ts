import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import SubTask from 'App/Models/SubTask'

export default class extends BaseSeeder {
  public static environment = ['development', 'test']
  public async run() {
    await SubTask.createMany([
      {
        name: "Ejecución llamado de bases",
        description: "",
        order: 1,
        command: "sh command",
        task_id:1
      },
      {
        name: "Mapeo",
        description: "",
        order: 1,
        command: "sh command",
        task_id:2
      },
      {
        name: "Organizar",
        description: "",
        order: 2,
        command: "sh command",
        task_id:2
      },
      {
        name: "Quitar duplicados",
        description: "",
        order: 3,
        command: "sh command",
        task_id:2
      },
      {
        name: "Llamador Variantes 1",
        description: "",
        order: 1,
        command: "sh command",
        task_id:3
      },
      {
        name: "Llamador Variantes 2",
        description: "",
        order: 1,
        command: "sh command",
        task_id:3
      },
      {
        name: "Llamador Variantes 3",
        description: "",
        order: 1,
        command: "sh command",
        task_id:3
      },
      {
        name: "Llamador Variantes 4",
        description: "",
        order: 1,
        command: "sh command",
        task_id:3
      },
      {
        name: "Llamador Variantes 5",
        description: "",
        order: 1,
        command: "sh command",
        task_id:3
      },
      {
        name: "Anotar",
        description: "",
        order: 1,
        command: "sh command",
        task_id:4
      }
    ])
  }
}

