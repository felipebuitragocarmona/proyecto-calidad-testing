import { DateTime } from 'luxon'
import { BaseModel, BelongsTo, HasMany, ManyToMany, belongsTo, column, hasMany, manyToMany } from '@ioc:Adonis/Lucid/Orm'
import Task from './Task'
import Param from './Param'
import Exam from './Exam'
import SubTaskExam from './SubTaskExam'

export default class SubTask extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public name:string

  @column()
  public description:string

  @column()
  public order:number

  @column()
  public command:string

  @column()
  public task_id:number

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @belongsTo(() => Task,{
    foreignKey: 'task_id', 
  })
  public task: BelongsTo<typeof Task>
  
  @manyToMany(() => Param, {
    pivotTable: 'subtask_param',
    pivotForeignKey: 'subtask_id',
    pivotRelatedForeignKey: 'param_id',
    pivotColumns: ['type','default_value'] 
  })
  public params: ManyToMany<typeof Param>

  @hasMany(() => SubTaskExam,{
    foreignKey: 'subtask_id'
  })
  public subTaskExam: HasMany<typeof SubTaskExam>

  @manyToMany(() => Exam, {
    pivotTable: 'subtask_exam', //Nombre tabla pivote
    pivotForeignKey: 'subtask_id', //Nombre de la clave que está en esta entidad
                               //pero en la tabla pivote
    pivotRelatedForeignKey: 'exam_id', //Nombre de la segunda clave
                                          //que sirve de pivote en la relación
    pivotColumns: ['previous_subtask_exam_id','created_at','finished_at'] 
  })
  public exams: ManyToMany<typeof Exam>

}
