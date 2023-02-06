import AppDataSource from "../../data-source"
import Volunteers from "../../entities/volunteers.entities"
import { AppError } from "../../errors/appError"

const volunteersDeleteService = async (id: string) => {
  const voluntaryRepository = AppDataSource.getRepository(Volunteers)

  const voluntary = await voluntaryRepository.findOneBy({ id })

  if (!voluntary) {
    throw new AppError(404, "User is not found")
  }

  await voluntaryRepository.remove(voluntary!)
}
export default volunteersDeleteService