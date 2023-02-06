import { Router } from "express";
import {
  campaignDeleteController,
  campaignsCreateController,
  campaignsListController,
  campaignsListServiceByIdController,
  updateCampaignsController,
} from "../Controllers/campaigns.controller";
import verifyInstitutionExistMiddleware from "../Middlewares/verifyInstitutionExist.middleware";
import verifyTokenVoluntaryMiddleware from "../Middlewares/verifyTokenVoluntary.middleware";

const campaignsRoutes = Router();

campaignsRoutes.post(
  "",
  verifyTokenVoluntaryMiddleware,
  verifyInstitutionExistMiddleware,
  campaignsCreateController
);
campaignsRoutes.get("", campaignsListController);
campaignsRoutes.get("/:id", campaignsListServiceByIdController);
campaignsRoutes.delete(
  "/:id",
  verifyTokenVoluntaryMiddleware,
  verifyInstitutionExistMiddleware,
  campaignDeleteController
);
campaignsRoutes.patch(
  "/:id",
  verifyTokenVoluntaryMiddleware,
  verifyInstitutionExistMiddleware,
  updateCampaignsController
);

export default campaignsRoutes;
