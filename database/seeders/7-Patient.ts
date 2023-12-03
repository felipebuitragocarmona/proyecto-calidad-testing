import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import Patient from 'App/Models/Patient'

export default class extends BaseSeeder {
  public static environment = ['development', 'test']
  public async run () {
    await Patient.createMany([
      {
        document: "10539988",
        name:"Paciente 1",
        lastname:"Apellido P1",
        birth_year:new Date("2001-09-23")
      },
      {
        document: "75003344",
        name:"Paciente 2",
        lastname:"Apellido P2",
        birth_year:new Date("2001-09-23")
      }
    ]

    )
  }
}
