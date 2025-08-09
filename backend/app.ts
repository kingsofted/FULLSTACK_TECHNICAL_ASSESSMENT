import express, { Express, Request, Response, NextFunction } from "express";
import dotenv from "dotenv";
import { startApolloServer } from "./src/config/apolloServer";
import { EventListener } from "./src/utils/events/EventListener";
import { jobElasticService } from "./src/utils/elasticSearch/job.elasticSearch";
import { elasticClient } from "./src/config/elasticSearch";
import { JOB_EVENTS } from "./src/constant/constant";




dotenv.config();

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

