import AppDataSource from "../../data-source";
import { Address } from "../../entities/address.entities";
import { Campaigns } from "../../entities/campaign.entities";
import { Institutions } from "../../entities/institutions.entity";
import { AppError } from "../../errors/appError";
import { ICampaigns } from "../../interfaces/campaigns";

const campaignsCreateService = async (data: ICampaigns) => {
  const addressRepository = AppDataSource.getRepository(Address);
  const campaignsRepository = AppDataSource.getRepository(Campaigns);
  const institutionRepository = AppDataSource.getRepository(Institutions);

  const { name, isAlive, address: addressArray, institutionId } = data;

  const institution = await institutionRepository.findOne({
    where: { id: institutionId },
    relations: { campaigns: true },
  });

  if (!institution) {
    throw new AppError(400, "institution does not exist");
  }

  institution.campaigns.forEach((curretCampaigns) => {
    if (curretCampaigns.name == name)
      throw new AppError(400, "Campaign already exists");
  });

  addressArray.forEach((currentobject) => {
    if (
      currentobject.city == undefined ||
      currentobject.state == undefined ||
      currentobject.road == undefined
    )
      throw new AppError(400, "missing data addrees");

    if (currentobject.road.length > 100)
      throw new AppError(400, "address road contains more than 100 characters");
    else if (currentobject.city.length > 50)
      throw new AppError(400, "address city contains more than 50 characters");
    else if (currentobject.state.length > 2)
      throw new AppError(400, "address state contains more than 2 characters");

    if (
      currentobject.complement !== undefined &&
      currentobject.complement != null
    ) {
      if (currentobject.complement.length > 120)
        throw new AppError(
          400,
          "address complement contains more than 120 characters"
        );
    } else if (
      currentobject.number !== undefined &&
      currentobject.number != null
    ) {
      if (currentobject.number.length > 50)
        throw new AppError(
          400,
          "address number contains more than 50 characters"
        );
    }
  });

  if (name == undefined || isAlive == undefined)
    throw new AppError(400, "missing data addrees");

  const campaign = new Campaigns();
  campaign.name = name;
  campaign.isActive = isAlive;
  campaign.institution = institution;
  campaign.date_creation = new Date();
  campaign.date_update = new Date();

  campaignsRepository.create(campaign);
  await campaignsRepository.save(campaign);

  const address = addressArray.map((curret) => {
    const addressTab = new Address();
    const { city, road, state, complement, number } = curret;

    addressTab.campaigns = campaign;
    addressTab.city = city;
    addressTab.road = road;
    addressTab.state = state;
    addressTab.complement = complement;
    addressTab.number = number;

    addressRepository.create(addressTab);
    addressRepository.save(addressTab);

    const { campaigns, ...address } = addressTab;

    return address;
  });

  return { ...campaign, address };
};

export default campaignsCreateService;
