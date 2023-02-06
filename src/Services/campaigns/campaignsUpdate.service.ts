import AppDataSource from "../../data-source";
import { AppError } from "../../errors/appError";
import { Campaigns } from "../../entities/campaign.entities";
import { Institutions } from "../../entities/institutions.entity";

const updateCampaignsService = async (
  name: string,
  id: string,
  institution: string
): Promise<Campaigns> => {
  const campaignsRepository = AppDataSource.getRepository(Campaigns);
  const InstitutionsRepository = AppDataSource.getRepository(Institutions);

  const findCampaigns = await campaignsRepository.findOne({
    where: {
      id,
    },
  });

  if (!findCampaigns) {
    throw new AppError(404, "campaigns not found");
  }

  const institutionData = await InstitutionsRepository.findOne({
    where: { id: institution },
  });

  if (!institutionData && institution !== undefined)
    throw new AppError(400, "institution not found");

  await campaignsRepository
    .createQueryBuilder()
    .update(Campaigns)
    .set({
      name: name ? name : findCampaigns.name,
      institution: institution ? institutionData! : findCampaigns.institution,
    })
    .where("id = :id", { id })
    .execute();

  const updateCampaigns = await campaignsRepository.findOne({
    where: {
      id,
    },
    relations: { address: true, institution: true },
    loadEagerRelations: false,
  });
  updateCampaigns?.institution;

  return updateCampaigns!;
};

export default updateCampaignsService;
