import { DateTime } from 'luxon'
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

export default class DatumSubTaskExam extends BaseModel {
  public static table = 'datum_sub_task_exam'

  @column({ isPrimary: true })
  public id: number

  @column()
  public type: string

  @column()
  public subtask_exam_id: number

  @column()
  public datum_id: number

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
