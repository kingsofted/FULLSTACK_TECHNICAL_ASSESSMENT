import { MigrationInterface, QueryRunner } from "typeorm";

export class AutoMigration1754230530379 implements MigrationInterface {
    name = 'AutoMigration1754230530379'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "jobs" ADD "details" text`);
        await queryRunner.query(`ALTER TABLE "jobs" ADD "created_at" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "jobs" ADD "updated_at" TIMESTAMP NOT NULL DEFAULT now()`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "jobs" DROP COLUMN "updated_at"`);
        await queryRunner.query(`ALTER TABLE "jobs" DROP COLUMN "created_at"`);
        await queryRunner.query(`ALTER TABLE "jobs" DROP COLUMN "details"`);
    }

}
