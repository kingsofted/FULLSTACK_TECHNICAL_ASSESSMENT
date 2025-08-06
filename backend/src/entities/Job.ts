import { Entity, PrimaryGeneratedColumn, Column, Index, CreateDateColumn, UpdateDateColumn } from "typeorm";

@Entity({ name: "jobs" })
export class Job {
  @PrimaryGeneratedColumn({ name: "job_id" })
  id!: number;

  @Index("idx_jobs_job_title")
  @Column({ name: "job_title", type: "varchar", length: 255 })
  title!: string;

  @Index("idx_jobs_company")
  @Column({ type: "varchar", length: 255 })
  company!: string;

  @Index("idx_jobs_location")
  @Column({ type: "varchar", length: 100 })
  location!: string;

  @Index("idx_jobs_experience_level")
  @Column({
    name: "experience_level",
    type: "varchar",
    length: 50,
  })
  experienceLevel!: "Entry-Level" | "Mid-Level" | "Senior-Level";

  @Column({ name: "salary_range", type: "numeric", precision: 8, scale: 2, nullable: true })
  salaryRange?: number;

  @Index("idx_jobs_industry")
  @Column({ type: "varchar", length: 100, nullable: true })
  industry?: string;

  @Column({ name: "required_skills", type: "text", nullable: true })
  requiredSkills?: string;

  @Column({ type: "text", nullable: true })
  details?: string; // Added for job description/details

  @CreateDateColumn({ name: "created_at", type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
  createdAt!: Date;

  @UpdateDateColumn({ name: "updated_at", type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
  updatedAt!: Date;
}
