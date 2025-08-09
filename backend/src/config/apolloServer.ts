
import typeDefs from '../graphql/schema';
import { resolvers } from '../graphql/resolvers';
import { AppDataSource } from './db';
import express, { Express, Request, Response, NextFunction } from 'express';
import helmet from 'helmet';
import cors from 'cors';
import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';

const startApolloServer = async () => {
  const port = process.env.PORT ? Number(process.env.PORT) : 4000;

  await AppDataSource.initialize();
  console.log('DB Connected');
  console.log('Entities:', AppDataSource.entityMetadatas.map(e => e.name));

  const server = new ApolloServer({
    typeDefs,
    resolvers,
  });

  // Apollo Server v4 requires calling start before applying middleware
  await server.start();

  const app: Express = express();

  // Security & parsing middleware
  app.use(helmet());
  app.use(cors());
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  // GraphQL endpoint
  app.use('/graphql', expressMiddleware(server));

  // Example REST route if you want
  app.get('/api/test', (req: Request, res: Response) => {
    res.send('API is working');
  });

  // Error handling middleware (keep it last)
  app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
  });

  app.listen(port, '0.0.0.0', () => {
    console.log(`⚡️[server]: Server is running at http://0.0.0.0:${port}/graphql`);
  });
};

export { startApolloServer };
