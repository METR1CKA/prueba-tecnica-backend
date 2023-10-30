import {
  MigrationInterface,
  QueryRunner
} from 'typeorm'

export class Providers1698548574168 implements MigrationInterface {
  tableName = 'providers'

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      CREATE TABLE ${this.tableName} (
        id SERIAL PRIMARY KEY NOT NULL,
        name character varying(100) NOT NULL,
        centroid_geometry geometry(Point),
        radius integer NOT NULL
      )
    `)
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      DROP TABLE IF EXISTS ${this.tableName}
    `)
  }
}
