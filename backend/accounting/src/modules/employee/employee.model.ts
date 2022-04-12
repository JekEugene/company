import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from 'typeorm'

@Entity(`employee`)
export class Employee extends BaseEntity {
  @PrimaryGeneratedColumn()
    id: number

  @Column(`varchar`)
    name: string

  @Column(`varchar`)
    surname: string

  @Column(`numeric`)
    salary: number
}
