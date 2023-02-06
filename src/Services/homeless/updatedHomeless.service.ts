import AppDataSource from "../../data-source";
import { Homeless } from "../../entities/homeless.entity";
import { AppError } from "../../errors/appError";
import { IHomelessUpdate } from "../../interfaces/homeless";

const updateHomelessService = async (id: string, { name, age, picture }: IHomelessUpdate) => {
  const homelessRepository = AppDataSource.getRepository(Homeless);

  const homelessToBeUpdated = await homelessRepository.findOneBy({
    id: id
  });

  if (!homelessToBeUpdated) {
    throw new AppError(400, 'Person not found');
  };

  await homelessRepository.update(
    id,
    {
      name: name ? name : homelessToBeUpdated.name,
      age: age ? age : homelessToBeUpdated.age,
      picture: picture ? picture : homelessToBeUpdated.picture
    }
  );

  const updatedHomeless = await homelessRepository.findOneBy({
    id: id
  });

  return updatedHomeless;
};

export default updateHomelessService;