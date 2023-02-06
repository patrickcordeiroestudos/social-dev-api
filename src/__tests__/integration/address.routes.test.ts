import request from "supertest";
import app from "../../app";
import { DataSource } from "typeorm";
import AppDataSource from "../../data-source";
import { mockedInstitution, mockedLogin } from "../mocks/institutions.mocks";
import { volunteerLogin, volunteerRequest } from "../mocks/volunteers.mocks.";
import { mockedCampaigns } from "../mocks/campaigns.mocks";
import { IInstitutions } from "../../interfaces/institutions";

describe("Ler os endereços", () => {
  let connection: DataSource;

  let institution: any;
  let volunteer: any;
  let token: string;

  beforeAll(async () => {
    await AppDataSource.initialize()
      .then((res) => {
        connection = res;
      })
      .catch((error) => {
        console.log(error);
      });

    volunteer = await request(app)
      .post("/volunteers/register")
      .send(volunteerRequest);
    institution = await request(app)
      .post("/register/institution")
      .send(mockedInstitution);

    const response = await request(app).post("/login").send(mockedLogin);

    token = `Bearer ${response.body.token}`;

    mockedCampaigns.institutionId = institution.body.id;

    const campaignRegister = await request(app)
      .post("/campaign")
      .send(mockedCampaigns)
      .set("Authorization", token);
  });

  afterAll(async () => {
    await connection.destroy();
  });

  test("GET /address -> Deve permitir ver todos os endereçõs", async () => {
    const response = await request(app).get("/address");

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("map");
  });

  test("GET /address/:id -> Deve permitir ver um endereço especifico", async () => {
    const response = await request(app).get("/address");

    const allAddress = await request(app).get(
      `/address/${response.body[0].id}`
    );

    expect(allAddress.status).toBe(200);
    expect(allAddress.body).toHaveProperty("id");
    expect(allAddress.body).toHaveProperty("road");
    expect(allAddress.body).toHaveProperty("number");
    expect(allAddress.body).toHaveProperty("complement");
    expect(allAddress.body).toHaveProperty("city");
    expect(allAddress.body).toHaveProperty("state");
  });

  test("GET /address/:id -> Deve disparar um erro de id não encontrado", async () => {
    const response = await request(app).get("/address/:id");

    expect(response.status).toBe(404);
    expect(response.body).toEqual(
      expect.objectContaining({
        status: "error",
        statusCode: 404,
        message: "id not found",
      })
    );
  });

  test("PATH /address/:id -> Deve atualizar o endereçõ", async () => {
    const response = await request(app).get("/address");

    const updateAddress = await request(app)
      .patch(`/address/${response.body[0].id}`)
      .send({
        road: "Travessa Municipalista",
        number: "21",
        complement: "rua c",
        city: "Macapá",
        state: "ap",
      })
      .set("Authorization", token);

    expect(updateAddress.status).toBe(200);
    expect(updateAddress.body.road).toEqual("Travessa Municipalista");
    expect(updateAddress.body.number).toEqual("21");
    expect(updateAddress.body.complement).toEqual("rua c");
    expect(updateAddress.body.city).toEqual("Macapá");
    expect(updateAddress.body.state).toEqual("ap");
  });

  test("PATH /address/:id -> Deve dispara um erro de id não encontrado", async () => {
    const response = await request(app).get("/address");

    const updateAddress = await request(app)
      .patch(`/address/8714aecc-0a0b-4fe3-9f20-f0c7058130fe`)
      .set("Authorization", token);

    expect(updateAddress.status).toBe(404);
    expect(updateAddress.body).toEqual(
      expect.objectContaining({
        status: "error",
        statusCode: 404,
        message: "id not found",
      })
    );
  });

  test("PATH /address/:id -> Deve dispara um erro de token não encontrado", async () => {
    const response = await request(app).get("/address");

    const updateAddress = await request(app).patch(
      `/address/8714aecc-0a0b-4fe3-9f20-f0c7058130fe`
    );

    expect(updateAddress.status).toBe(401);
    expect(updateAddress.body).toEqual(
      expect.objectContaining({
        message: "Invalid token",
      })
    );
  });
});
