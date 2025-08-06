import express, { Express, Request, Response, NextFunction } from "express";
import dotenv from "dotenv";
import { startApolloServer } from "./src/config/apolloServer";
import { EventListener } from "./src/utils/events/EventListener";
import { jobElasticService } from "./src/utils/elasticSearch/job.elasticSearch";
import { elasticClient } from "./src/config/elasticSearch";
import { JOB_EVENTS } from "./src/constant/constant";




dotenv.config();
const app: Express = express();

// Initialize the database
// initializeDatabase();

// Middleware
// app.use(helmet());
// app.use(cors());
// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));

// Start Apollo Server
startApolloServer();

(async () => {
  try {
    const info = await elasticClient.info();
    console.log("Connected to Elasticsearch:", info);
  } catch (err) {
    console.error("Elasticsearch connection failed:", err);
  }
})();

// Event handler
// Initialize Event Listener (singleton)
EventListener.getInstance().listen(jobElasticService);



// // Routes
// app.use("/api/item", itemRoute);

// // Error handling middleware
// app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
//   console.error(err.stack);
//   res.status(500).send("Something broke!");
// });

// // Start server
// app.listen(port, () => {
//   console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
// });
