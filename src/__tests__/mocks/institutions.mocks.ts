import { IInstitutions, IInstitutionsLogin } from "../../interfaces/institutions";

export const mockedInstitution: IInstitutions = {
  name: "Billy",
  email: "billy@mail.com",
  cnpj:"12345678912345",
  address:"Alameda Sagrado Coração",
  phone:"4133224455",
  isActive:true,
  password: "123456"
}

export const mockedInstitutionDelete : IInstitutions = {
  name: "Recanto das Aguas",
  email: "recantodasaguas@mail.com",
  cnpj:"12345678912346",
  address:"Alameda Sagrado Coração",
  phone:"4133224455",
  isActive:true,
  password: "123456"
}

export const mockedInstitutionDeleteLogin : IInstitutionsLogin = {
  email: "recantodasaguas@mail.com",
  password: "123456"
}


export const mockedInstitutionInvalidCNPJ: IInstitutions = {
  name: "Billy",
  email: "billy@mail.com",
  cnpj:"123456789123456789123",
  address:"Alameda Sagrado Coração",
  phone:"4133224455",
  isActive:true,
  password: "123456"
}

export const mockedLogin : IInstitutionsLogin= {
  email: "billy@mail.com",
  password: "123456"
}

