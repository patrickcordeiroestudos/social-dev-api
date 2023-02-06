import { Request, Response, NextFunction } from "express";
import AppDataSource from "../data-source";
import { Homeless } from "../entities/homeless.entity";
import { AppError } from "../errors/appError";

const verifyIfHomelessExistsMiddleware = async (req: Request, res: Response, next: NextFunction) => {
  const { name } = req.body;

  const homelessRepository = AppDataSource.getRepository(Homeless);

  const homelessAlreadyExists = await homelessRepository.findOneBy({
    name: name
  });

  if (homelessAlreadyExists) {
    throw new AppError(400, 'Name is already registered');
  };
  
  return next();
};

export default verifyIfHomelessExistsMiddleware;