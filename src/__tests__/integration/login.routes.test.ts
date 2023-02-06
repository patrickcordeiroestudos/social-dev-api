import request from "supertest";
import { DataSource } from "typeorm";
import app from "../../app";
import AppDataSource from "../../data-source";
import { mockedInstitution } from "../mocks/institutions.mocks";
import {
  mockedInstitutionLogin,
  mockedVolunteersLogin,
} from "../mocks/login.mocks";
import { volunteerLogin, volunteerRequest } from "../mocks/volunteers.mocks.";

describe("/login", () => {
  let connection: DataSource;

  beforeAll(async () => {
    await AppDataSource.initialize()
      .then((res) => {
        connection = res;
      })
      .catch((err) => {
        console.error("Error during Data Source initialization", err);
      });

    await request(app).post("/volunteers/register").send(volunteerRequest);
    await request(app).post("/register/institution").send(mockedInstitution);
  });

  afterAll(async () => {
    await connection.destroy();
  });

  test("POST /login -> Deve ser possivel realizar o login como voluntário", async () => {
    const response = await request(app).post("/login").send(volunteerLogin);

    expect(response.body).toHaveProperty("token");
    expect(response.status).toBe(200);
  });

  test("POST /login -> Deve ser possivel realizar o login como instituição", async () => {
    const response = await request(app)
      .post("/login")
      .send(mockedInstitutionLogin);

    expect(response.body).toHaveProperty("token");
    expect(response.status).toBe(200);
  });

  test("POST /login -  Não deve permitir realizar login com o email ou a senha incorreta", async () => {
    const response = await request(app).post("/login").send({
      email: "patrick@mail.com",
      password: "1234567",
    });

    expect(response.body).toHaveProperty("message");
    expect(response.status).toBe(403);
  });
});
