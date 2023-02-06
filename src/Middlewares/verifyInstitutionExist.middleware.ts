import { Request, Response, NextFunction } from "express";
import AppDataSource from "../data-source";
import { Institutions } from "../entities/institutions.entity";
import { AppError, handleError } from "../errors/appError";

const verifyInstitutionExistMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.user;

    const institutionRepository = AppDataSource.getRepository(Institutions);

    const institution = await institutionRepository.findOne({
      where: { id },
    });

    if (!institution) {
      throw new AppError(401, "you are not an institution");
    }

    return next();
  } catch (err) {
    if (err instanceof AppError) {
      handleError(err, res);
    }
  }
};

export default verifyInstitutionExistMiddleware;
