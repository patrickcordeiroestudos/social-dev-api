import AppDataSource from "../../data-source";
import { Address } from "../../entities/address.entities";

const addressService = async () => {
  const addressRepository = AppDataSource.getRepository(Address);

  const allAddress = await addressRepository.find();

  return allAddress;
};

export default addressService;
