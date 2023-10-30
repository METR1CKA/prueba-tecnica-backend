import {
  BaseEntity,
  Column,
  Entity,
  PrimaryGeneratedColumn,
  BeforeInsert,
  BeforeUpdate,
} from 'typeorm'
import bcrypt from 'bcrypt'

@Entity('users')
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  public id: number

  @Column({
    type: 'varchar',
    unique: true,
    length: 100,
  })
  public email: string

  @Column({
    type: 'varchar',
    length: 200,
  })
  public password: string

  @Column({
    type: 'varchar',
    length: 100,
  })
  public username: string

  @BeforeInsert()
  @BeforeUpdate()
  public async hashPassword(): Promise<void> {
    this.password = await bcrypt.hash(this.password, 10)
  }

  public async comparePassword(attempt: string): Promise<boolean> {
    return await bcrypt.compare(attempt, this.password)
  }
}