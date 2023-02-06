import { Request, Response, NextFunction } from "express";
import AppDataSource from "../data-source";
import Volunteers from "../entities/volunteers.entities";
import { AppError } from "../errors/appError";

const verifyVoluntaryExists = async (req: Request, res: Response, next: NextFunction) => {
  const voluntary = req.body

  const volunteersRepository = AppDataSource.getRepository(Volunteers)

  const verifyCpf = await volunteersRepository.findOne({
    where: {
      cpf: voluntary.cpf
    }
  })
  if (verifyCpf) {
    throw new AppError(400, "There is already a voluntary at this cpf")
  }

  const verifyEmail = await volunteersRepository.findOne({
    where: {
      email: voluntary.email
    }
  })
  if (verifyEmail) {
    throw new AppError(400, "There is already a voluntary at this email")
  }

  next()
}

export default verifyVoluntaryExists