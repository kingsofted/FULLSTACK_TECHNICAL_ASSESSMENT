import { Client } from "@elastic/elasticsearch";
import dotenv from "dotenv";

dotenv.config();
console.log("HIHIHH" , process.env.ELASTICSEARCH_URL);
// Create an Elasticsearch client instance
export const elasticClient = new Client({
  node: process.env.ELASTICSEARCH_URL || "http://localhost:9200",
  auth: {
    apiKey: process.env.ELASTICSEARCH_API_KEY || "",
  },
  serverMode: 'serverless',
});
