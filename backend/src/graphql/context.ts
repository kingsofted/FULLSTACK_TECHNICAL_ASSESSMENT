import { AppDataSource } from "../config/db";

export interface GraphQLContext {
  db: typeof AppDataSource;
}

export const createContext = async (): Promise<GraphQLContext> => {
  return {
    db: AppDataSource,
  };
};
