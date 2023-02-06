import AppDataSource from "../../data-source";
import { Homeless } from "../../entities/homeless.entity";
import { AppError } from "../../errors/appError";

const getByIdService = async (id: string): Promise<Homeless> => {
  const homelessRepository = AppDataSource.getRepository(Homeless);

  if (!id) {
    throw new AppError(400, "ID required");
  }

  const homeless = await homelessRepository.findOneBy({
    id: id,
  });

  if (!homeless) {
    throw new AppError(400, "Person not found");
  }

  return homeless;
};

export default getByIdService;
