import AppDataSource from '../../data-source'
import { Institutions } from '../../entities/institutions.entity';
import { IInstitutions } from '../../interfaces/institutions';
import { hash } from 'bcrypt'

const updateInstitutionService = async(id:string, {name, cnpj, address, email, phone, password}:IInstitutions):Promise<Institutions> =>{
  const institutionRepository = AppDataSource.getRepository(Institutions);
  const institution = await institutionRepository.findOneBy({id})

  await institutionRepository.update(id, {
  name: name ? name : institution!.name,
  cnpj: cnpj ? cnpj : institution!.cnpj,
  address: address ? address : institution!.address,
  email: email ? email : institution!.email,
  phone: phone ? phone : institution!.phone,
  password: password ? await hash(password,10) : institution!.password
  })
  
  const institutionEdited = await institutionRepository.findOneBy({id})

  return institutionEdited!
}

export default updateInstitutionService