import 'reflect-metadata'
import { Entity, PrimaryGeneratedColumn, BaseEntity, Column } from 'typeorm'

@Entity()
export class DBConnection extends BaseEntity {

  @PrimaryGeneratedColumn({
    type: 'bigint',
  })
  id!: number

  @Column({
    type: 'integer',
  })
  i!: number
}