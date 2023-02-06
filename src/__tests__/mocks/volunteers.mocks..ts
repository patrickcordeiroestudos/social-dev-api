import { IVolunteerRequest, IVolunteerLogin } from "../../interfaces/volunteers";

export const volunteerRequest: IVolunteerRequest = {
  name: "Clayson",
  age: "34",
  cpf: "40040040005",
  email: "clayson@gmail.com",
  telephone: "123456789",
  password: "1234"
}

export const volunteerUpdate: IVolunteerRequest = {
  name: "Josefa",
  cpf: "40040040011",
  age: "89",
  telephone: "123456789",
  email: "josefa@gmail.com",
  password: "1234"
}

export const volunteerLogin: IVolunteerLogin = {
  email: "clayson@gmail.com",
  password: "1234"
}