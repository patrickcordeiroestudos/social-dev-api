import AppDataSource from "../../data-source"
import Volunteers from "../../entities/volunteers.entities"

const volunteersListService = async () => {
  const volunteersRepository = AppDataSource.getRepository(Volunteers)

  const volunteers = await volunteersRepository.find()

  return volunteers
}

export default volunteersListService