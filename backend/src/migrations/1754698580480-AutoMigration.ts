import { MigrationInterface, QueryRunner } from "typeorm";

export class AutoMigration1754698580480 implements MigrationInterface {
    name = 'AutoMigration1754698580480'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "favorites" ("id" SERIAL NOT NULL, "job_id" integer NOT NULL, CONSTRAINT "PK_890818d27523748dd36a4d1bdc8" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "favorites" ADD CONSTRAINT "FK_3dbeedd2139d4ec5562118c7ced" FOREIGN KEY ("job_id") REFERENCES "jobs"("job_id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "favorites" DROP CONSTRAINT "FK_3dbeedd2139d4ec5562118c7ced"`);
        await queryRunner.query(`DROP TABLE "favorites"`);
    }

}
