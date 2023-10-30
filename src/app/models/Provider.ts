import {
  BaseEntity,
  Column,
  Entity,
  PrimaryGeneratedColumn,
  Point
} from 'typeorm'

@Entity('providers')
export class Provider extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number

  @Column({
    type: 'varchar',
    length: 100
  })
  name: string

  @Column({
    type: 'geometry',
    spatialFeatureType: 'Point',
    nullable: true,
  })
  centroid_geometry: Point

  @Column({
    type: 'integer',
  })
  radius: number
}
