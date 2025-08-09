import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from '@apollo/server/standalone';
import typeDefs from "../graphql/schema";
import { resolvers } from "../graphql/resolvers";
import { AppDataSource } from "./db";
import express, { Express, Request, Response, NextFunction } from "express";
import helmet from "helmet";
import cors from "cors";

 
// Apollo Server setup
const startApolloServer = async() => {

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