import AppDataSource from "../../data-source";
import Volunteers from "../../entities/volunteers.entities";
import { AppError } from "../../errors/appError";

const voluntaryListService = async (id: string) => {
  const volunteersRepository = AppDataSource.getRepository(Volunteers);

  const voluntary = await volunteersRepository.findOneBy({ id });

  if (!voluntary) {
    throw new AppError(400, "Voluntary is not found");
  }

  return voluntary;
};

export default voluntaryListService;
