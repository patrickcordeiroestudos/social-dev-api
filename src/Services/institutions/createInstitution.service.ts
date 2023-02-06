import AppDataSource from '../../data-source'
import { Institutions } from '../../entities/institutions.entity'
import { IInstitutions } from '../../interfaces/institutions'
import { hashSync} from 'bcrypt'

const createInstitutionService = async({name, cnpj, address, phone, email, password}:IInstitutions):Promise<Institutions> =>{
  const institutionRepository = AppDataSource.getRepository(Institutions)
  
  const newInstitution = institutionRepository.create({
    name,
    cnpj,
    address,
    phone,
    email,
    password: hashSync(password , 10)
  })

  await institutionRepository.save(newInstitution)

  return newInstitution
}

export default createInstitutionService