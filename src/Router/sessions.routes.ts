import { Router } from "express";
import { createSessionController } from "../Controllers/sessions.controller";

const sessionRoutes = Router();

sessionRoutes.post("", createSessionController);

export default sessionRoutes;
