import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import Exam from 'App/Models/Exam'

export default class extends BaseSeeder {
  public static environment = ['development', 'test']
  public async run() {
    await Exam.createMany([
      {
        name: "Examen 1",
        patient_id:1,
        process_id:1
      },
      {
        name: "Examen 1",
        patient_id:2,
        process_id:1
      }
    ]

    )
  }
}
