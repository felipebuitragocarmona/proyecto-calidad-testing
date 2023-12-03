import { DateTime } from 'luxon'
import { BaseModel, BelongsTo, HasMany, belongsTo, column, hasMany } from '@ioc:Adonis/Lucid/Orm'
import SubTask from './SubTask'
import Datum from './Datum'

export default class Param extends BaseModel {
  @column({ isPrimary: true })
  public id: number 

  @column()
  public name:string

  @column()
  public type:string

  @column()
  public optional:boolean

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @belongsTo(() => SubTask,{
    foreignKey: 'sub_task_id', 
  })
  public process: BelongsTo<typeof SubTask>

  @hasMany(() => Datum,{
    foreignKey: 'param_id'
  })
  public params: HasMany<typeof Datum>
  
}
