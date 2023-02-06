export interface IInstitutions{
  name:string,
  cnpj:string,
  address:string,
  phone:string,
  email:string,
  isActive:boolean,
  password:string
}

export interface IInstitutionsLogin{
  email:string,
  password:string
}