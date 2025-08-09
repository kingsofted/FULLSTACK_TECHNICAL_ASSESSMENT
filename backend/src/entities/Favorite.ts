import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from "typeorm";
import { Job } from "./Job";

@Entity({ name: "favorites" })
export class Favorite {
  @PrimaryGeneratedColumn()
  id!: number;

  @ManyToOne(() => Job)
  @JoinColumn({ name: "job_id" })
  job!: Job;

  @Column({ name: "job_id" })
  jobId!: number;
}
