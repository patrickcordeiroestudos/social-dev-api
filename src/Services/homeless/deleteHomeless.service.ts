import AppDataSource from "../../data-source";
import { Homeless } from "../../entities/homeless.entity";
import { AppError } from "../../errors/appError";

const deleteHomelessService = async (id: string): Promise<void> => {
  const homelessRepository = AppDataSource.getRepository(Homeless);

  if (!id) {
    throw new AppError(400, 'ID required');
  };

  const homelessToBeDeleted = await homelessRepository.findOneBy({
    id: id
  });

  if (!homelessToBeDeleted) {
    throw new AppError(404, 'Person not found');
  };

  await homelessRepository.delete({id: id});
};

export default deleteHomelessService;