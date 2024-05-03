import express from "express";
import { configMiddleware } from "./middlewares/index.js";

const createApp = () => {
  const app = express();
  configMiddleware(app);

  return app;
};

export default createApp;
