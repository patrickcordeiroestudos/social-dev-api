import AppDataSource from "../../data-source";
import { Campaigns } from "../../entities/campaign.entities";
import { AppError } from "../../errors/appError";

const campaignsListServiceById = async (id: string): Promise<Campaigns> => {
  const campaignsRepository = AppDataSource.getRepository(Campaigns);

  const campaigns = await campaignsRepository.findOne({
    where: { id },
    relations: { address: true, institution: true },
    loadEagerRelations: false,
  });

  if (!campaigns) {
    throw new AppError(401, "id not found");
  }

  return campaigns;
};

export default campaignsListServiceById;
