import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from '@apollo/server/standalone';
import typeDefs from "../graphql/schema";
import { resolvers } from "../graphql/resolvers";
import { AppDataSource } from "./db";
import express, { Express, Request, Response, NextFunction } from "express";
import helmet from "helmet";
import cors from "cors";


// const mockJobs = [
//   {
//     id: "1",
//     job_title: "Frontend Developer",
//     company: "TechCorp",
//     location: "Remote",
//     experience_level: "Mid-Level",
//     salary_range: 80000,
//     industry: "Software",
//     required_skills: "React, TypeScript, CSS"
//   },
//   {
//     id: "2",
//     job_title: "Backend Developer",
//     company: "DataWorks",
//     location: "Singapore",
//     experience_level: "Senior-Level",
//     salary_range: 120000,
//     industry: "Finance",
//     required_skills: "Node.js, PostgreSQL, GraphQL"
//   }
// ];
 
// Apollo Server setup
const startApolloServer = async() => {

  // const typeDefs = `
  //   type Query {
  //     getJobs: [Job]
  //     getJobById(id: ID!): Job
  //   }

  //   type Mutation {
  //     addJob(
  //       job_title: String!,
  //       company: String!,
  //       location: String!,
  //       experience_level: String!,
  //       salary_range: Float,
  //       industry: String,
  //       required_skills: String
  //     ): Job
  //     updateJob(
  //       id: ID!,
  //       job_title: String,
  //       company: String,
  //       location: String,
  //       experience_level: String,
  //       salary_range: Float,
  //       industry: String,
  //       required_skills: String   
  //     ): Job
  //   }

  //   type Job{
  //     id: ID!
  //     job_title: String!
  //     company: String!
  //     location: String!
  //     experience_level: String!
  //     salary_range: Float
  //     industry: String
  //     required_skills: String
  //   }

  // `;

 
  // const resolvers = {
  //   Query: {
  //     getJobs: () => {
  //       return mockJobs;
  //     },
  //     getJobById: (_: any, { id }: { id: string }) => {
  //       mockJobs.find(job => job.id === id);
  //     }
  //   },
  //   Mutation:{
  //     addJob: (_: any, {input}: {input: any}) => {
  //       const newJob = {
  //         id: String(mockJobs.length + 1),
  //         ...input,
  //         createdAt: new Date().toISOString()
  //       };
  //       mockJobs.push(newJob);
  //       return newJob;
  //     },
  //     updateJob: (_: any, {id, input}: {id: string, input: any}) => {
  //       const jobIndex = mockJobs.findIndex(job => job.id === id);
  //       if (jobIndex === -1) {
  //         throw new Error("Job not found");
  //       }
  //       const updatedJob = {          ...mockJobs[jobIndex],
  //         ...input
  //       };
  //       mockJobs[jobIndex] = updatedJob;
  //       return updatedJob;
  //     },
  //   }
  // };

  await AppDataSource.initialize();
  console.log("DB Connected");
  console.log("Entities:", AppDataSource.entityMetadatas.map(e => e.name));

  const server = new ApolloServer({
    typeDefs,
    resolvers,
  });

  const {url} = await startStandaloneServer(server, {
    listen: { port: 4000 },
  });

  console.log(`Apollo Server ready at ${url}`);
}




// const startApolloServer = async() => {
//   const port = process.env.PORT || 4000;


//   await AppDataSource.initialize();
//   console.log("DB Connected");
//   console.log("Entities:", AppDataSource.entityMetadatas.map(e => e.name));

//   const server = new ApolloServer({
//     typeDefs,
//     resolvers,
//   });

//   await server.start();

//   // Middleware
//   const app: Express = express();
//   app.use(helmet());
//   app.use(cors());
//   app.use(express.json());
//   app.use(express.urlencoded({ extended: true }));


//   // Routes
//   app.use("/api/test", expressMiddleware(server));

//   // Error handling middleware
//   app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
//     console.error(err.stack);
//     res.status(500).send("Something broke!");
//   });

//   // Start server
//   app.listen(port, () => {
//     console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
//   });
// }

export { startApolloServer };