import { DateTime } from 'luxon'
import { BaseModel, BelongsTo, ManyToMany, belongsTo, column, manyToMany } from '@ioc:Adonis/Lucid/Orm'
import SubTaskExam from './SubTaskExam'
import Param from './Param'

export default class Datum extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public value:string

  @column()
  public param_id:number

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @belongsTo(() => Param,{
    foreignKey: 'param_id', 
  })
  public param: BelongsTo<typeof Param>

  @manyToMany(() => SubTaskExam, {
    pivotTable: 'datum_sub_task_exam', //Nombre tabla pivote
    pivotForeignKey: 'datum_id', //Nombre de la clave que está en esta entidad
                               //pero en la tabla pivote
    pivotRelatedForeignKey: 'subtask_exam_id', //Nombre de la segunda clave
                                          //que sirve de pivote en la relación
  })
  public dataSubTaskExam: ManyToMany<typeof SubTaskExam>
}
