import { DateTime } from 'luxon'
import { BaseModel, BelongsTo, HasMany, belongsTo, column, hasMany } from '@ioc:Adonis/Lucid/Orm'
import Process from './Process'
import SubTask from './SubTask'

export default class Task extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public name:string

  @column()
  public description:string

  @column()
  public order:number

  @column()
  public process_id:number

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @belongsTo(() => Process,{
    foreignKey: 'process_id', 
  })
  public process: BelongsTo<typeof Process>
  
  @hasMany(() => SubTask,{
    foreignKey: 'task_id'
  })
  public subTasks: HasMany<typeof SubTask>
}
