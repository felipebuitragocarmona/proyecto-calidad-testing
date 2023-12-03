import { DateTime } from 'luxon'
import { BaseModel, ManyToMany, column, manyToMany } from '@ioc:Adonis/Lucid/Orm'
import Datum from './Datum'

export default class SubTaskExam extends BaseModel {
  public static table = 'subtask_exam'
  @column({ isPrimary: true })
  public id: number

  @column()
  public previous_subtask_exam_id: number
  
  @column()
  public exam_id: number

  @column()
  public subtask_id: number

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @column.dateTime()
  public finished_at: DateTime

  @manyToMany(() => Datum, {
    pivotTable: 'datum_sub_task_exam', //Nombre tabla pivote
    pivotForeignKey: 'subtask_exam_id', //Nombre de la clave que está en esta entidad
                               //pero en la tabla pivote
    pivotRelatedForeignKey: 'datum_id', //Nombre de la segunda clave
                                          //que sirve de pivote en la relación
    pivotColumns:["type"]
                                        })
  public dataSubTaskExam: ManyToMany<typeof Datum>
  
}
