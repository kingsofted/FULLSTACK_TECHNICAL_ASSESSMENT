import { MigrationInterface, QueryRunner } from "typeorm";

export class AutoMigration1754184386564 implements MigrationInterface {
    name = 'AutoMigration1754184386564'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "jobs" ("job_id" SERIAL NOT NULL, "job_title" character varying(255) NOT NULL, "company" character varying(255) NOT NULL, "location" character varying(100) NOT NULL, "experience_level" character varying(50) NOT NULL, "salary_range" numeric(8,2), "industry" character varying(100), "required_skills" text, CONSTRAINT "PK_75f2e130e4b1372fea0b6248a17" PRIMARY KEY ("job_id"))`);
        await queryRunner.query(`CREATE INDEX "idx_jobs_job_title" ON "jobs" ("job_title") `);
        await queryRunner.query(`CREATE INDEX "idx_jobs_company" ON "jobs" ("company") `);
        await queryRunner.query(`CREATE INDEX "idx_jobs_location" ON "jobs" ("location") `);
        await queryRunner.query(`CREATE INDEX "idx_jobs_experience_level" ON "jobs" ("experience_level") `);
        await queryRunner.query(`CREATE INDEX "idx_jobs_industry" ON "jobs" ("industry") `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX "public"."idx_jobs_industry"`);
        await queryRunner.query(`DROP INDEX "public"."idx_jobs_experience_level"`);
        await queryRunner.query(`DROP INDEX "public"."idx_jobs_location"`);
        await queryRunner.query(`DROP INDEX "public"."idx_jobs_company"`);
        await queryRunner.query(`DROP INDEX "public"."idx_jobs_job_title"`);
        await queryRunner.query(`DROP TABLE "jobs"`);
    }

}
