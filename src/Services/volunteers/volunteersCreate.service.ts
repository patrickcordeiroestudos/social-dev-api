import { hashSync } from "bcrypt";
import AppDataSource from "../../data-source"
import Volunteers from "../../entities/volunteers.entities"
import { IVolunteerRequest } from "../../interfaces/volunteers"

const volunteersCreateService = async (volunteer: IVolunteerRequest) => {

  const volunteersRepository = AppDataSource.getRepository(Volunteers)

  const password = hashSync(volunteer.password, 10)

  const newVolunteer = new Volunteers()
  newVolunteer.name = volunteer.name
  newVolunteer.age = volunteer.age
  newVolunteer.cpf = volunteer.cpf
  newVolunteer.email = volunteer.email
  newVolunteer.telephone = volunteer.telephone
  newVolunteer.volunteer_id = []
  newVolunteer.password = password

  volunteersRepository.create(newVolunteer)
  await volunteersRepository.save(newVolunteer)

  return newVolunteer

}

export default volunteersCreateService