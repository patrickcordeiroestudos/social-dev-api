import { hash } from "bcrypt"

import AppDataSource from "../../data-source"
import Volunteers from "../../entities/volunteers.entities"

import { AppError } from "../../errors/appError"
import { IVolunteerRequest } from "../../interfaces/volunteers"

const volunteersUpdateService = async (id: string, { name, cpf, age, telephone, email, password }: IVolunteerRequest) => {
  const voluntaryRepository = AppDataSource.getRepository(Volunteers)

  const findVoluntary = await voluntaryRepository.findOneBy({ id })

  if (!findVoluntary) {
    throw new AppError(404, "User not found")
  }

  await voluntaryRepository.update(
    id,
    {
      name: name ? name : findVoluntary.name,
      email: email ? email : findVoluntary.email,
      cpf: cpf ? cpf : findVoluntary.cpf,
      password: password ? await hash(password, 10) : findVoluntary.password,
      age: age ? age : findVoluntary.age,
      telephone: telephone ? telephone : findVoluntary.telephone
    }
  )

  const volunterUpdate = await voluntaryRepository.findOneBy({ id })

  const volunterVisible = {
    id: volunterUpdate!.id,
    name: volunterUpdate!.name,
    age: volunterUpdate!.age,
    email: volunterUpdate!.email,
    cpf: volunterUpdate!.cpf,
    telephone: volunterUpdate!.telephone
  }

  return volunterVisible
}

export default volunteersUpdateService