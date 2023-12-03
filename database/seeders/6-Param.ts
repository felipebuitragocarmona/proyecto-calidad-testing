import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import Param from 'App/Models/Param'

export default class extends BaseSeeder {
  public static environment = ['development', 'test']
  public async run() {
    await Param.createMany([
      {
        name: "ntasks",
        type: "integer",
        optional: true,
      },
      {
        name: "mem",
        type: "integer",
        optional: true,
      },
      {
        name: "job-name",
        type: "string",
        optional: true,
      },
      {
        name: "time",
        type: "time",
        optional: true,
      },
      //5 t1 s1
      {
        name: "cpu_threads_per_caller",
        type: "integer",
        optional: true,
      },
      //6 t1 s1
      {
        name: "flowcell",
        type: "string",
        optional: true,
      },
      //7 t1 s1
      {
        name: "kit",
        type: "string",
        optional: true,
      },
      //8 t1 s1
      {
        name: "num_callers",
        type: "integer",
        optional: true,
      },
      //9 t1 s1
      {
        name: "min_qscore",
        type: "integer",
        optional: true,
      },
      //10 t2 s1
      {
        name: "r",
        type: "string",
        optional: true,
      },
      //11 t2 s1
      {
        name: "m",
        type: "string",
        optional: true,
      },
      //12 t4 s1
      {
        name: "l",
        type: "string",
        optional: true,
      },
      //13 t1 s1
      {
        name: "Señales crudas",
        type: "file",
        optional: false,
      },
      //14 t2 s1
      {
        name: "Lecturas crudas",
        type: "file",
        optional: false,
      },
      //15 t2 s2
      {
        name: "Archivo mapeo",
        type: "file",
        optional: false,
      },
      //16 t2 s3
      {
        name: "Archivo mapeo organizado",
        type: "file",
        optional: false,
      },
      //17 t3 s todos
      {
        name: "Archivo mapeo organizado sin duplicados",
        type: "file",
        optional: false,
      },
      //18 t4 s1
      {
        name: "Archivo VCF",
        type: "file",
        optional: false,
      },
      //19 t4 s1
      {
        name: "Variantes anotadas VCF",
        type: "file",
        optional: false,
      },
    ]
    )
  }
}
