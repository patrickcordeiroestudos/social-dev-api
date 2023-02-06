import { Router } from "express";
import {
  addressByIdController,
  addressUpdateController,
  allAddressController,
} from "../Controllers/address.controllers";
import verifyInstitutionExistMiddleware from "../Middlewares/verifyInstitutionExist.middleware";
import verifyTokenVoluntaryMiddleware from "../Middlewares/verifyTokenVoluntary.middleware";

const addressRouter = Router();

addressRouter.get("", allAddressController);
addressRouter.get("/:id", addressByIdController);
addressRouter.patch(
  "/:id",
  verifyTokenVoluntaryMiddleware,
  verifyInstitutionExistMiddleware,
  addressUpdateController
);

export default addressRouter;
