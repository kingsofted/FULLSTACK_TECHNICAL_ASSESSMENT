// config/db.ts
import knex from "knex";
import config from "../../knexfile";

export const db = knex(config.development);

export interface GraphQLContext {
  db: typeof db;
}

export const createContext = async (): Promise<GraphQLContext> => {
  return {
    db
  };
};
