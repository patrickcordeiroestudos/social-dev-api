import { Router } from "express";
import { createHomelessController, deleteHomelessController, getByIdController, listHomelessController, updateHomelessController } from "../Controllers/homeless.controllers";
import verifyIfHomelessExistsMiddleware from "../Middlewares/verifyIfHomelessExists.middleware";
import verifyTokenVoluntaryMiddleware from "../Middlewares/verifyTokenVoluntary.middleware";

const homelessRoutes = Router();

homelessRoutes.post('/register', verifyTokenVoluntaryMiddleware, verifyIfHomelessExistsMiddleware, createHomelessController);
homelessRoutes.get('', listHomelessController);
homelessRoutes.get('/:id', getByIdController);
homelessRoutes.patch('/:id', verifyTokenVoluntaryMiddleware, updateHomelessController);
homelessRoutes.delete('/:id', verifyTokenVoluntaryMiddleware, deleteHomelessController);

export default homelessRoutes;