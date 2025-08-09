import type { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  // Jobs table
  await knex.schema.createTable("jobs", (table) => {
    table.increments("job_id").primary();
    table.string("job_title", 255).notNullable().index("idx_jobs_job_title");
    table.string("company", 255).notNullable().index("idx_jobs_company");
    table.string("location", 100).notNullable().index("idx_jobs_location");
    table
      .string("experience_level", 50)
      .notNullable()
      .index("idx_jobs_experience_level"); 
    table.decimal("salary_range", 8, 2).nullable();
    table.string("industry", 100).nullable().index("idx_jobs_industry");
    table.text("required_skills").nullable();
    table.text("details").nullable();
    table
      .timestamp("created_at")
      .defaultTo(knex.fn.now())
      .notNullable();
    table
      .timestamp("updated_at")
      .defaultTo(knex.fn.now())
      .notNullable();
  });

  // Favorites table
  await knex.schema.createTable("favorites", (table) => {
    table.increments("id").primary();
    table
      .integer("job_id")
      .unsigned()
      .notNullable()
      .references("job_id")
      .inTable("jobs")
      .onDelete("CASCADE");
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTableIfExists("favorites");
  await knex.schema.dropTableIfExists("jobs");
}
