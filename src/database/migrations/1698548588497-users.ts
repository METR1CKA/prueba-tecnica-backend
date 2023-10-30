import {
  MigrationInterface,
  QueryRunner
} from 'typeorm'

export class Users1698548588497 implements MigrationInterface {
  tableName = 'users'

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      CREATE TABLE ${this.tableName} (
        id SERIAL PRIMARY KEY NOT NULL,
        email character varying(100) UNIQUE NOT NULL,
        password character varying(200) NOT NULL,
        username character varying(100) NOT NULL
      )
    `)
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      DROP TABLE IF EXISTS ${this.tableName}
    `)
  }
}
