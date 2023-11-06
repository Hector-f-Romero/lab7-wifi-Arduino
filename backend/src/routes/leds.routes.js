import { Router } from "express";
import { getLeds, postLeds } from "../controllers/leds.controller.js";

export const ledsRouter = Router();

ledsRouter.get("/", getLeds);

ledsRouter.post("/", postLeds);
