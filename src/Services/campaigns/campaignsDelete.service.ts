import AppDataSource from "../../data-source";
import { Campaigns } from "../../entities/campaign.entities";
import { AppError } from "../../errors/appError";

const campaignsDeleteService = async (id: string): Promise<void> => {
  const campaignsRepository = AppDataSource.getRepository(Campaigns);
  const findCampaigns = await campaignsRepository.findOneBy({
    id,
  });

  if (!findCampaigns) {
    throw new AppError(401, "id not found");
  }

  if (!findCampaigns?.isActive) {
    throw new AppError(400, "User is already inactive");
  }

  await campaignsRepository.update(id, {
    isActive: false,
  });
};

export default campaignsDeleteService;
