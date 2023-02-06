import AppDataSource from "../../data-source";
import { Address } from "../../entities/address.entities";
import { AppError } from "../../errors/appError";
import { IAddressUpdate } from "../../interfaces/address";

const addressUpdateService = async (
  id: string,
  { city, complement, number, road, state }: IAddressUpdate
) => {
  const addressRepository = AppDataSource.getRepository(Address);
  const allAddress = await addressRepository.findOne({ where: { id } });

  if (!allAddress) {
    throw new AppError(404, "id not found");
  }

  if (road != undefined && road.length > 100)
    throw new AppError(400, "address road contains more than 100 characters");
  else if (city != undefined && city.length > 50)
    throw new AppError(400, "address city contains more than 50 characters");
  else if (state != undefined && state.length > 2)
    throw new AppError(400, "address state contains more than 2 characters");
  else if (complement != undefined && complement.length > 120)
    throw new AppError(
      400,
      "address complement contains more than 120 characters"
    );
  else if (number != undefined && number.length > 50)
    throw new AppError(400, "address number contains more than 50 characters");

  await addressRepository
    .createQueryBuilder()
    .update(Address)
    .set({
      road: road ? road : allAddress.road,
      city: city ? city : allAddress.city,
      complement: complement ? complement : allAddress.complement,
      number: number ? number : allAddress.number,
      state: state ? state : allAddress.state,
    })
    .where("id = :id", { id })
    .execute();

  const AddressUpdate = await addressRepository.findOne({ where: { id } });

  return AddressUpdate;
};

export default addressUpdateService;
