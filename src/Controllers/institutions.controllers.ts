import { Request, Response } from "express";
import createInstitutionService from "../Services/institutions/createInstitution.service";
import deleteInstitutionService from "../Services/institutions/deleteInstitution.service";
import updateInstitutionService from "../Services/institutions/updateInstitution.service";
import { instanceToPlain } from "class-transformer";
import listInstitutionProfileService from "../Services/institutions/listInstitutionProfile.service";
import listAllInstitutionsService from "../Services/institutions/listAllInstitutions.service";

const createInstitutionController = async (req: Request, res: Response) => {
  const data = req.body;
  console.log(data);
  const institution = await createInstitutionService(data);
  res.status(201).json(instanceToPlain(institution));
};

const listInstitutionProfileController = async (
  req: Request,
  res: Response
) => {
  const id = req.user.id;
  const institution = await listInstitutionProfileService(id);
  res.status(200).json(instanceToPlain(institution));
};

const listAllInstitutionsController = async (req: Request, res: Response) => {
  const institution = await listAllInstitutionsService();
  res.status(200).json(instanceToPlain(institution));
};

const updateInstitutionController = async (req: Request, res: Response) => {
  const id = req.user.id;
  const data = req.body;
  const institution = await updateInstitutionService(id, data);
  res.status(200).json(instanceToPlain(institution));
};

const deleteInstitutionController = async (req: Request, res: Response) => {
  const id = req.user.id;
  const institution = await deleteInstitutionService(id);
  res.status(204).send();
};

export {
  createInstitutionController,
  updateInstitutionController,
  deleteInstitutionController,
  listAllInstitutionsController,
  listInstitutionProfileController,
};
