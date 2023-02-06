import { compare } from "bcrypt"
import jwt from "jsonwebtoken"
import "dotenv/config"
import { IVolunteerLogin } from "../../interfaces/volunteers"
import AppDataSource from "../../data-source"
import { AppError } from "../../errors/appError"
import Volunteers from "../../entities/volunteers.entities"

const volunteerLoginService = async ({ email, password }: IVolunteerLogin) => {
  const voluntaryRepository = AppDataSource.getRepository(Volunteers)

  const volunteers = await voluntaryRepository.find()

  const voluntary = volunteers.find(voluntary => voluntary.email === email)

  if (!voluntary) {
    throw new AppError(403, "Invalid email or password")
  }

  const passwordMath = await compare(password, voluntary.password)

  if (!passwordMath) {
    throw new AppError(403, "Invalid email or password")
  }

  const token = jwt.sign({

  },
    process.env.SECRET_KEY as string,
    {
      expiresIn: '24h',
      subject: voluntary.id
    }
  )

  return token
}

export default volunteerLoginService