import express, { Express, Request, Response, NextFunction } from "express";
import dotenv from "dotenv";
import { startApolloServer } from "./src/config/apolloServer";
import { EventListener } from "./src/utils/events/EventListener";
import { jobElasticService } from "./src/utils/elasticSearch/job.elasticSearch";
import { elasticClient } from "./src/config/elasticSearch";



(async () => {
  await startApolloServer();

  try {
    const info = await elasticClient.info();
    console.log("Connected to Elasticsearch:", info);
  } catch (err) {
    console.error("Elasticsearch connection failed:", err);
  }

  EventListener.getInstance().listen(jobElasticService);
})();
