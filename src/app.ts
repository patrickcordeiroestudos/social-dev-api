import "reflect-metadata";
import "express-async-errors";
import express from "express";
import institutionRoutes from "./Router/institutions.routes";
import volunteersRoutes from "./Router/volunteers.routes";
import sessionRoutes from "./Router/sessions.routes";
import handleErroMiddleware from "./Middlewares/handleErro.middleware";
import homelessRoutes from "./Router/homeless.routes";
import addressRouter from "./Router/address.routes";
import cors from "cors";
import campaignsRoutes from "./Router/campaigns.routes";

const app = express();
const allowedOrigins = [
  "http://localhost:3001",
  "http://localhost:3000/register/institution",
];

const options: cors.CorsOptions = {
  origin: allowedOrigins,
};

// Then pass these options to cors:
app.use(cors(options));
app.use(express.json());

app.use("/login", sessionRoutes);
app.use("/register/institution", institutionRoutes);
app.use("/homeless", homelessRoutes);
app.use("/address", addressRouter);
app.use("/volunteers", volunteersRoutes);
app.use("/campaign", campaignsRoutes);

app.use(handleErroMiddleware);

export default app;
