import { ICampaigns } from "../../interfaces/campaigns";

export const mockedCampaigns: ICampaigns = {
  id: "ef0463e8-62b7-4943-b0c0-4220267dfb9e",
  name: "Ana",
  isAlive: true,
  address: [
    {
      road: "Rua Paraná",
      number: "123",
      complement: "ao lado do supermercado",
      city: "Curitiba",
      state: "PR",
    },
  ],
  date_creation: "",
  date_update: "",
  institutionId: "",
};

export const mockedCampaignInvalidInstitutionId: ICampaigns = {
  id: "ef0463e8-62b7-4943-b0c0-4220267dfb9e",
  name: "Ana",
  isAlive: true,
  address: [
    {
      road: "Rua Paraná",
      number: "123",
      complement: "ao lado do supermercado",
      city: "Curitiba",
      state: "PR",
    },
  ],
  date_creation: "",
  date_update: "",
  institutionId: "8f9ae6ce-e36c-4d9d-9bd7-b4c98cb4e4f4",
};

export const mockedCampaignsInvalidStat: ICampaigns = {
  id: "ef0463e8-62b7-4943-b0c0-4220267dfb9e",
  name: "Ana",
  isAlive: true,
  address: [
    {
      road: "Rua Paraná",
      number: "123",
      complement: "ao lado do supermercado",
      city: "Curitiba",
      state: "PRGO",
    },
  ],
  date_creation: "",
  date_update: "",
  institutionId: "",
};
