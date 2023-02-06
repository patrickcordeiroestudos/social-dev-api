import { DataSource } from 'typeorm'
import app from '../../app'
import AppDataSource from '../../data-source'
import request from 'supertest'
import { mockedInstitution, mockedInstitutionDelete, mockedInstitutionDeleteLogin, mockedInstitutionInvalidCNPJ, mockedLogin } from '../mocks/institutions.mocks'

describe("/register/institution", () => {
  let connection: DataSource

  beforeAll(async() => {
      await AppDataSource.initialize().then((res) => {
          connection = res
      }).catch((err) => {
          console.error("Error during Data Source initialization", err)
      })
  })

  afterAll(async() => {
      await connection.destroy()
  })

  test("POST /register/institution -  Deve permitir cadastrar uma instituição",async () => {
      const response = await request(app).post('/register/institution').send(mockedInstitution)

      expect(response.body).toHaveProperty("id")
      expect(response.body).toHaveProperty("name")
      expect(response.body).toHaveProperty("email")
      expect(response.body).toHaveProperty("address")
      expect(response.body).toHaveProperty("cnpj")
      expect(response.body).toHaveProperty("isActive")
      expect(response.body).toHaveProperty("phone")
      expect(response.body).not.toHaveProperty("password")
      expect(response.body.name).toEqual("Billy")
      expect(response.body.email).toEqual("billy@mail.com")
      expect(response.body.cnpj).toEqual("12345678912345")
      expect(response.status).toBe(201)        
  })

  test("POST /register/institution -  Não deve criar uma instituição que já existe",async () => {
    const response = await request(app).post('/register/institution').send(mockedInstitution)

    expect(response.body).toHaveProperty("message")
    expect(response.status).toBe(400)
         
  })

  test("POST /register/institution -  Não deve cadastrar uma instituição com CNPJ inválido",async () => {
    const response = await request(app).post('/register/institution').send(mockedInstitutionInvalidCNPJ)
    expect(response.body).toHaveProperty("message")
    expect(response.status).toBe(400)
 
  })

  test("GET /register/institution -  Deve listar todas as instituições cadastradas",async () => {
    const response = await request(app).get('/register/institution')
    expect(response.body).toHaveLength(1)
    expect(response.status).toBe(200)
 
  })

  test("GET /register/institution/profile -  Deve listar os dados da instituição logada",async () => {
    const admingLoginResponse = await request(app).post("/login").send(mockedLogin);
    const token = `Bearer ${admingLoginResponse.body.token}`

    const response = await request(app).get('/register/institution/profile').set("Authorization", token)
  
    expect(response.body).toHaveProperty("id")
    expect(response.body).toHaveProperty("name")
    expect(response.body).toHaveProperty("email")
    expect(response.body).toHaveProperty("address")
    expect(response.body).toHaveProperty("cnpj")
    expect(response.body).toHaveProperty("isActive")
    expect(response.body).toHaveProperty("phone")
    expect(response.body).not.toHaveProperty("password")
    expect(response.body.name).toEqual("Billy")
    expect(response.body.email).toEqual("billy@mail.com")
    expect(response.body.cnpj).toEqual("12345678912345")
    expect(response.status).toBe(200)
 
  })

  test("PATCH /register/institution/profile -  Não deve atualizar uma instituição sem estar autenticado",async () => {
    const adminLoginResponse = await request(app).post("/login").send();
    const userTobeUpdate = await request(app).get('/register/institution/profile').set("Authorization", `Bearer ${adminLoginResponse.body.token}`)
    const response = await request(app).patch(`/register/institution/profile`)

    expect(response.body).toHaveProperty("message")
    expect(response.status).toBe(401)
         
  })

  test("PATCH /register/institution/profile -  Deve atualizar a instituição corretamente",async () => {
    const newValues = {name: "Recanto Fortaleza", email: "recantofortaleza@mail.com"}

    const admingLoginResponse = await request(app).post("/login").send(mockedLogin);
    const token = `Bearer ${admingLoginResponse.body.token}`
    
    const userTobeUpdateRequest = await request(app).get("/register/institution/profile").set("Authorization", token)

    const response = await request(app).patch("/register/institution/profile").set("Authorization",token).send(newValues)

    const userUpdated = await request(app).get("/register/institution").set("Authorization", token)

    expect(response.status).toBe(200)
    expect(userUpdated.body[0].name).toEqual("Recanto Fortaleza")
    expect(userUpdated.body[0]).not.toHaveProperty("password")
  })  
  
  test("DELETE /register/institution/profile -  Não deve deletar a instituição sem estar autenticado",async () => {
    const adminLoginResponse = await request(app).post("/login").send(mockedLogin);
    const UserTobeDeleted = await request(app).get('/register/institution/profile').set("Authorization", `Bearer ${adminLoginResponse.body.token}`)

    const response = await request(app).delete(`/register/institution/profile`)

    expect(response.body).toHaveProperty("message")
    expect(response.status).toBe(401)
         
  })

  test("DELETE /register/institution/profile -  Deve realizar um soft delete da instituição",async () => {
    const createInstitution = await request(app).post('/register/institution').send(mockedInstitutionDelete)
    
    const admingLoginResponse = await request(app).post("/login").send(mockedInstitutionDeleteLogin);
    const token = `Bearer ${admingLoginResponse.body.token}`
    
    const response = await request(app).delete("/register/institution/profile").set("Authorization",token)

    const findInstitution = await request(app).get('/register/institution').set("Authorization", token)
    
    expect(response.status).toBe(204)
    expect(findInstitution.body[1].isActive).toBe(false)
 
  })

})

 
