import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import Process from 'App/Models/Process'

export default class extends BaseSeeder {
  public static environment = ['development', 'test']
  public async run() {
    await Process.create(
      {
        name: "Pipe Line V01",
        description: "Primera versión de pipeline",
      }
    )
  }
}
