import { MigrationInterface, QueryRunner } from 'typeorm'

export class seed1649265701776 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    console.log(`here`)
    await queryRunner.query(`INSERT INTO account(
        id, money)
        VALUES (1, 10000.00);`)
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DELETE FROM account
	WHERE id=1`)
  }
}
