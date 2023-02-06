import { Request, Response } from "express";
import { AppError, handleError } from "../errors/appError";
import { IHomelessUpdate } from "../interfaces/homeless";
import createHomelessService from "../Services/homeless/createHomeless.service";
import deleteHomelessService from "../Services/homeless/deleteHomeless.service";
import getByIdService from "../Services/homeless/getById.service";
import listHomelessService from "../Services/homeless/listHomeless.service";
import updateHomelessService from "../Services/homeless/updatedHomeless.service";

const createHomelessController = async (req: Request, res: Response) => {
  try {
    const { name, age, picture , institution} = req.body;

    const createdHomeless = await createHomelessService({name, age, picture, institution});

    return res.status(201).json(createdHomeless);
  } catch(err) {
    if (err instanceof AppError) {
      handleError(err, res);
    };
  };
};

const listHomelessController = async (req: Request, res: Response) => {
  const homelessList = await listHomelessService();

  return res.status(200).json(homelessList);
};

const getByIdController = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const homeless = await getByIdService(id);

    return res.status(200).json(homeless);
  } catch(err) {
    if (err instanceof AppError) {
      handleError(err, res);
    };
  };  
};

const updateHomelessController = async (req: Request, res: Response) => {
  try {
    const user: IHomelessUpdate = req.body;
    const { id } = req.params;

    const updatedHomeless = await updateHomelessService(id, user);

    return res.status(200).json(updatedHomeless);
  } catch(err) {
    if (err instanceof AppError) {
      handleError(err, res);
    };
  };
};

const deleteHomelessController = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const deleteUser = await deleteHomelessService(id);

    return res.status(204).send()
  } catch(err) {
    if (err instanceof AppError) {
      handleError(err, res);
    };
  };
};

export { createHomelessController, listHomelessController, getByIdController, updateHomelessController, deleteHomelessController };