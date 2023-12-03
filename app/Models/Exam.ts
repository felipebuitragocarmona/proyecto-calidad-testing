import { DateTime } from 'luxon'
import { BaseModel, BelongsTo, ManyToMany, belongsTo, column, manyToMany } from '@ioc:Adonis/Lucid/Orm'
import Patient from './Patient'
import Process from './Process'

export default class Exam extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public name: string

  @column()
  public patient_id: number

  @column()
  public process_id:number

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @belongsTo(() => Patient,{
    foreignKey: 'patient_id', 
  })
  public process: BelongsTo<typeof Patient>

  @manyToMany(() => Exam, {
    pivotTable: 'subtask_exam', //Nombre tabla pivote
    pivotForeignKey: 'exam_id', //Nombre de la clave que está en esta entidad
                               //pero en la tabla pivote
    pivotRelatedForeignKey: 'subtask_id', //Nombre de la segunda clave
                                          //que sirve de pivote en la relación
    pivotColumns: ['previous_subtask_exam_id','created_at','finished_at'] //obtener datos de columnas adicionales
  })
  public subtasks: ManyToMany<typeof Exam>

  @belongsTo(() => Process,{
    foreignKey: 'process_id', 
  })
  public theProcess: BelongsTo<typeof Process>
}
