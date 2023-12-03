import { DateTime } from 'luxon'
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

export default class SubtaskParam extends BaseModel {
  public static table = 'subtask_param'
  @column({ isPrimary: true })
  public id: number

  @column()
  public type: string

  @column()
  public subtask_id: number

  @column()
  public param_id: number

  @column()
  public default_value:string
  
  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
