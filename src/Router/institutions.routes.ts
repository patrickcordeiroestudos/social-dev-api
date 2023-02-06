import { Router } from "express";
import {
  createInstitutionController,
  deleteInstitutionController,
  listAllInstitutionsController,
  listInstitutionProfileController,
  updateInstitutionController,
} from "../Controllers/institutions.controllers";
import verifyCNPJAndEmailMiddleware from "../Middlewares/verifyCNPJAndEmailInstitutions.middleware";
import verifyInstitutionExistMiddleware from "../Middlewares/verifyInstitutionExist.middleware";
import verifyTokenVoluntaryMiddleware from "../Middlewares/verifyTokenVoluntary.middleware";

const institutionRoutes = Router();

institutionRoutes.post(
  "",
  verifyCNPJAndEmailMiddleware,
  createInstitutionController
);
institutionRoutes.get("", listAllInstitutionsController);
institutionRoutes.get(
  "/profile",

  verifyTokenVoluntaryMiddleware,
  listInstitutionProfileController
);
institutionRoutes.patch(
  "/profile",
  verifyTokenVoluntaryMiddleware,
  updateInstitutionController
);
institutionRoutes.delete(
  "/profile",
  verifyTokenVoluntaryMiddleware,
  deleteInstitutionController
);

export default institutionRoutes;
