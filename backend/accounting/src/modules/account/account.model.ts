import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from 'typeorm'

@Entity(`account`)
export class Account extends BaseEntity {
  @PrimaryGeneratedColumn()
    id: number

  @Column(`numeric`)
    money: number
}
