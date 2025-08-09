

 
// Apollo Server setup
// const startApolloServer = async() => {

//   await AppDataSource.initialize();
//   console.log("DB Connected");
//   console.log("Entities:", AppDataSource.entityMetadatas.map(e => e.name));

//   const server = new ApolloServer({
//     typeDefs,
//     resolvers,
//   });

//   const {url} = await startStandaloneServer(server, {
//     listen: { port: process.env.PORT ? Number(process.env.PORT) : 4000 },
//   });

//   console.log(`Apollo Server ready at ${url}`);
// }



// export { startApolloServer };


// src/server.ts
import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import typeDefs from "../graphql/schema";
import { resolvers } from "../graphql/resolvers";
import { db } from "./db";

const startApolloServer = async () => {
  try {
    // Test DB connection
    await db.raw("SELECT 1+1 AS result");
    console.log("✅ DB Connected");

    const server = new ApolloServer({
      typeDefs,
      resolvers,
    });

    const { url } = await startStandaloneServer(server, {
      listen: { port: process.env.PORT ? Number(process.env.PORT) : 4000 },
      context: async () => ({ db }), // Pass db into context
    });

    console.log(`🚀 Apollo Server ready at ${url}`);
  } catch (err) {
    console.error("❌ Error connecting to DB:", err);
    process.exit(1);
  }
};

export { startApolloServer };
