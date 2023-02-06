import { Request, Response } from "express";
import { AppError, handleError } from "../errors/appError";
import createSessionService from "../Services/sessions/createSession.service";

const createSessionController = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const token = await createSessionService({ email, password });

    return res.status(200).json({ token });
  } catch (error) {
    if (error instanceof AppError) {
      handleError(error, res);
    }
  }
};

export { createSessionController };
