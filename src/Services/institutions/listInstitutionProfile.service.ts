import AppDataSource from "../../data-source";
import { Institutions } from "../../entities/institutions.entity";

const listInstitutionProfileService = (id: string) => {
  const institutionRepository = AppDataSource.getRepository(Institutions);
  const institution = institutionRepository.findOneBy({ id });
  return institution;
};

export default listInstitutionProfileService;
