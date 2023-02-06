import AppDataSource from "../../data-source";
import { Address } from "../../entities/address.entities";
import { AppError } from "../../errors/appError";

const addressByIdService = async (id: string) => {
  const addressRepository = AppDataSource.getRepository(Address);
  const allAddress = await addressRepository.findOne({ where: { id } });

  if (!allAddress) {
    throw new AppError(404, "id not found");
  }

  return allAddress;
};

export default addressByIdService;
