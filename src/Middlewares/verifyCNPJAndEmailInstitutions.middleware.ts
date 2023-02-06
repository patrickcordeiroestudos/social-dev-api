import { NextFunction, Request, Response } from 'express'
import AppDataSource from '../data-source'
import { Institutions } from '../entities/institutions.entity'
import { AppError } from '../errors/appError'

const verifyCNPJAndEmailMiddleware = async(req:Request, res:Response, next:NextFunction)=>{
  const {email, cnpj} = req.body

  const institutionRepository = AppDataSource.getRepository(Institutions)
  const data = await institutionRepository.find()

  const emailExists = data.find(institution=>institution.email === email)
  const cnpjExists = data.find(institution=>institution.cnpj === cnpj)
   
  if(emailExists){
    throw new AppError(400,'E-mail already registered')
  }

  if(cnpjExists){
    throw new AppError(400,'CNPJ already registered')
  }

  next()
}
export default verifyCNPJAndEmailMiddleware