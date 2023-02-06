import request from "supertest";
import app from "../../app";
import { DataSource } from "typeorm";
import AppDataSource from "../../data-source";
import { volunteerLogin, volunteerRequest } from "../mocks/volunteers.mocks.";

describe("Cadastra um voluntário", () => {

  let connection: DataSource

  beforeAll(async () => {
    await AppDataSource.initialize()
      .then(res => {
        connection = res
      })
      .catch(error => {
        console.log(error)
      })
  })

  afterAll(async () => {
    await connection.destroy()
  })

  test("POST /volunteers/register -> Deve permitir o cadastro de um voluntário", async () => {

    const resultVoluntary = await request(app).post("/volunteers/register").send(volunteerRequest)

    expect(resultVoluntary.status).toBe(201)
    expect(resultVoluntary.body).toHaveProperty("id")
    expect(resultVoluntary.body).toHaveProperty("cpf")
    expect(resultVoluntary.body).toHaveProperty("age")
    expect(resultVoluntary.body).toHaveProperty("name")
    expect(resultVoluntary.body).toHaveProperty("email")
    expect(resultVoluntary.body).toHaveProperty("telephone")
    expect(resultVoluntary.body).not.toHaveProperty("password")

  })

  test("POST /volunteers/login -> Deve ser posivel logar um voluntario", async () => {
    const response = await request(app).post("/volunteers/login").send(volunteerLogin);

    expect(response.status).toBe(200)
    expect(response.body).toHaveProperty("token")

  })

  test("POST /volunteers/login -> Não deve ser possivel logar com password ou email incorreto", async () => {
    const response = await request(app).post("/volunteers/login").send({
      email: "asdasdffssafd@mail.com",
      password: "asddasjkdjhsad"
    });

    expect(response.body).toHaveProperty("message")
    expect(response.status).toBe(403)

  })

  test("GET /volunteers -> Não deve listar os voluntarios sem autenticação", async () => {
    const response = await request(app).get('/volunteers')

    expect(response.body).toHaveProperty("message")
    expect(response.status).toBe(401)

  })

  test("GET /volunteers -> Deve listar todos voluntarios", async () => {
    await request(app).post('/volunteers').send(volunteerRequest)
    const voluntaryLoginResponse = await request(app).post("/login").send(volunteerLogin);
    const response = await request(app).get('/volunteers').set("Authorization", `Bearer ${voluntaryLoginResponse.body.token}`)

    expect(response.body)

  })

  test("GET /volunteers/:id -> Não deve listar os voluntarios sem autenticação", async () => {
    const response = await request(app).get('/volunteers/:id')

    expect(response.body).toHaveProperty("message")
    expect(response.status).toBe(401)

  })

  test("GET /volunteers/:id -> Deve listar um voluntario", async () => {
    const voluntaryLoginResponse = await request(app).post("/volunteers/login").send(volunteerLogin)
    const token = `Bearer ${voluntaryLoginResponse.body.token}`

    const voluntaryTobeUpdate = await request(app).get('/volunteers').set("Authorization", token)
    const voluntaryTobeUpdateId = voluntaryTobeUpdate.body[0].id

    const response = await request(app).get(`/volunteers/${voluntaryTobeUpdateId}`).set("Authorization", token).send(volunteerLogin)

    expect(response.status).toBe(200)
    expect(response.body).toHaveProperty("id")
    expect(response.body).toHaveProperty("cpf")
    expect(response.body).toHaveProperty("age")
    expect(response.body).toHaveProperty("name")
    expect(response.body).toHaveProperty("email")
    expect(response.body).toHaveProperty("telephone")
    expect(response.body).not.toHaveProperty("password")

  })

  test("PATCH /volunteers/:id -> Não deve ser possivel atualizar um voluntario sem autorização", async () => {
    const voluntaryLoginResponse = await request(app).post("/volunteers/login").send(volunteerLogin);
    const voluntaryTobeUpdate = await request(app).get('/volunteers').set("Authorization", `Bearer ${voluntaryLoginResponse.body.token}`)
    const response = await request(app).patch(`/volunteers/${voluntaryTobeUpdate.body[0].id}`)

    expect(response.body).toHaveProperty("message")
    expect(response.status).toBe(401)

  })

  test("PATCH /volunteers/:id -> Deve permitir a atualização de um voluntário", async () => {
    const voluntaryLoginResponse = await request(app).post("/volunteers/login").send(volunteerLogin)
    const token = `Bearer ${voluntaryLoginResponse.body.token}`

    const voluntaryTobeUpdate = await request(app).get('/volunteers').set("Authorization", token)
    const voluntaryTobeUpdateId = voluntaryTobeUpdate.body[0].id

    const response = await request(app).patch(`/volunteers/${voluntaryTobeUpdateId}`).set("Authorization", token).send(volunteerLogin)

    expect(response.status).toBe(200)
    expect(response.body).toHaveProperty("id")
    expect(response.body).toHaveProperty("cpf")
    expect(response.body).toHaveProperty("age")
    expect(response.body).toHaveProperty("name")
    expect(response.body).toHaveProperty("email")
    expect(response.body).toHaveProperty("telephone")
    expect(response.body).not.toHaveProperty("password")

  })

  test("DELETE /volunteers/:id -> Não deve deletar um voluntario sem estar autenticado", async () => {
    const voluntaryLoginResponse = await request(app).post("/volunteers/login").send(volunteerLogin);
    const voluntaryTobeDeleted = await request(app).get('/volunteers').set("Authorization", `Bearer ${voluntaryLoginResponse.body.token}`)

    const response = await request(app).delete(`/volunteers/${voluntaryTobeDeleted.body[0].id}`)

    expect(response.body).toHaveProperty("message")
    expect(response.status).toBe(401)

  })

  test("DELETE -> /voluteers/:id -> Não deve deletar um voluntario com o id invalido", async () => {
    await request(app).post('/volunteers').send(volunteerRequest)

    const voluntaryLoginResponse = await request(app).post("/volunteers/login").send(volunteerLogin);

    const response = await request(app).delete(`/volunteers/13970660-5dbe-423a-9a9d-5c23b37943cf`).set("Authorization", `Bearer ${voluntaryLoginResponse.body.token}`)
    expect(response.status).toBe(404)
    expect(response.body).toHaveProperty("message")

  })

  test("DELETE /volunteers/:id -> Deve ser possivel deletar um voluntario", async () => {
    await request(app).post('/volunteers').send(volunteerRequest)

    const voluntaryLoginResponse = await request(app).post("/volunteers/login").send(volunteerLogin);
    const voluntaryTobeDeleted = await request(app).get('/volunteers').set("Authorization", `Bearer ${voluntaryLoginResponse.body.token}`)

    const response = await request(app).delete(`/volunteers/${voluntaryTobeDeleted.body[0].id}`).set("Authorization", `Bearer ${voluntaryLoginResponse.body.token}`)

    expect(response.status).toBe(204)

  })
})