import AppDataSource from '../../data-source'
import { Institutions } from '../../entities/institutions.entity'
import { AppError } from '../../errors/appError'

const deleteInstitutionService = async(id:string)=>{
  const institutionRepository = AppDataSource.getRepository(Institutions)
  const institution = await institutionRepository.findOneBy({id})

  if(institution!.isActive === false){
    throw new AppError(400,'Institution already isActive = false');
  }

  institution!.isActive = false

  await institutionRepository.save(institution!)
}

export default deleteInstitutionService