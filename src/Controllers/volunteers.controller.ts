import { Request, Response } from "express";
import { IVolunteerRequest } from "../interfaces/volunteers";
import voluntaryListService from "../Services/volunteers/voluntaryList.service";
import volunteersCreateService from "../Services/volunteers/volunteersCreate.service";
import volunteersDeleteService from "../Services/volunteers/volunteersDelete.service";
import volunteersListService from "../Services/volunteers/volunteersList.service";
import volunteerLoginService from "../Services/volunteers/volunteersLogin.service";
import volunteersUpdateService from "../Services/volunteers/volunteersUpdate.service";

const volunteersCreateController = async (req: Request, res: Response) => {
  const volunteer = req.body;

  const volunteerCreated = await volunteersCreateService(volunteer);

  const volunteerVisible = {
    id: volunteerCreated.id,
    name: volunteerCreated.name,
    age: volunteerCreated.age,
    email: volunteerCreated.email,
    cpf: volunteerCreated.cpf,
    telephone: volunteerCreated.telephone,
  };

  return res.status(201).json(volunteerVisible);
};

const volunteersLoginController = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  const token = await volunteerLoginService({ email, password });

  return res.status(200).json({ token });
};

const volunteersListController = async (req: Request, res: Response) => {
  const volunteers = await volunteersListService();

  const newArray = volunteers.map((voluntary) => {
    const newVoluntary = {
      id: voluntary.id,
      name: voluntary.name,
      age: voluntary.age,
      email: voluntary.email,
      cpf: voluntary.cpf,
      telephone: voluntary.telephone,
    };
    return newVoluntary;
  });

  return res.status(200).json(newArray);
};

const volunteersUpdateController = async (req: Request, res: Response) => {
  const voluntary: IVolunteerRequest = req.body;
  const id: string = req.user.id;

  const updatedUser = await volunteersUpdateService(id, voluntary);

  return res.status(200).json(updatedUser);
};

const volunteersDeleteController = async (req: Request, res: Response) => {
  const { id } = req.params;

  const voluntaryDeleted = await volunteersDeleteService(id);
  return res.status(204).json({
    message: "Voluntary deleted",
  });
};

const voluntaryListController = async (req: Request, res: Response) => {
  const id = req.user.id;

  const voluntary = await voluntaryListService(id);

  const newVoluntary = {
    id: voluntary.id,
    name: voluntary.name,
    age: voluntary.age,
    email: voluntary.email,
    cpf: voluntary.cpf,
    telephone: voluntary.telephone,
  };
  return res.status(200).json(newVoluntary);
};

export {
  volunteersCreateController,
  volunteersListController,
  volunteersUpdateController,
  volunteersLoginController,
  volunteersDeleteController,
  voluntaryListController,
};
