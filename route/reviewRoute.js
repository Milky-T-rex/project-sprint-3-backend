import express from "express";
import { getReviewList } from "../controllers/reviewcontroller.js";

const reviewRouter = express.Router();

// Define the route that handles getting reviews
reviewRouter.get("/", getReviewList);

export default reviewRouter;  // Use ES Module export