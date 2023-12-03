import { DateTime } from 'luxon'
import { BaseModel, BelongsTo, belongsTo, column } from '@ioc:Adonis/Lucid/Orm'
import Role from './Role'

export default class User extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public name:string

  @column()
  public nick_name:string

  @column()
  public email:string

  @column()
  public role_id:number

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @belongsTo(() => Role,{
    foreignKey: 'role_id', 
  })
  public role: BelongsTo<typeof Role>
}
