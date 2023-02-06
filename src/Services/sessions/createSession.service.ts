import AppDataSource from "../../data-source";
import Volunteers from "../../entities/volunteers.entities";
import { Institutions } from "../../entities/institutions.entity";
import { IUserLogin } from "../../interfaces/users";
import { compareSync } from "bcrypt";
import { AppError } from "../../errors/appError";
import jwt from "jsonwebtoken";
import "dotenv/config";

const createSessionService = async ({ email, password }: IUserLogin) => {
  const volunteerRepository = AppDataSource.getRepository(Volunteers);
  const intitutionRepository = AppDataSource.getRepository(Institutions);

  const volunteer = await volunteerRepository.find();
  const institution = await intitutionRepository.find();

  const accountVolunteer = volunteer.find((user) => user.email === email);
  const accountIntitution = institution.find((user) => user.email === email);

  let account;

  accountVolunteer
    ? (account = accountVolunteer)
    : (account = accountIntitution);

  if (!account) {
    throw new AppError(403, "Account not found");
  }

  if (!compareSync(password, account.password)) {
    throw new AppError(403, "Wrong email/password");
  }

  const token = jwt.sign(
    {
      email: email,
      id: account.id,
    },

    process.env.SECRET_KEY as string,
    {
      expiresIn: "24h",
      subject: account.id,
    }
  );
  let type;
  if (!accountIntitution) {
    type = "volunteer";
  } else {
    type = "institution";
  }

  return { token: token, type: type };
};

export default createSessionService;
