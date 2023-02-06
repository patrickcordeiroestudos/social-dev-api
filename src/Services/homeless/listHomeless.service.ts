import AppDataSource from "../../data-source";
import { Homeless } from "../../entities/homeless.entity";

const listHomelessService = async (): Promise<Homeless[]> => {
  const homelessRepository = AppDataSource.getRepository(Homeless);

  console.log();
  const homelessList = await homelessRepository.find({
    relations: { institution: true },
  });

  return homelessList;
};

export default listHomelessService;
