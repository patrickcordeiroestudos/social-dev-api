//import { Institutions } from "../entities/institutions.entity";
import { IAddress } from "./address";

export interface ICampaignsRequest {
  name: string;
  address: IAddress;
  institutoId: string;
}

export interface ICampaigns {
  id: string;
  name: string;
  isAlive: boolean;
  date_creation: string;
  date_update: string;
  address: IAddress[];
  institutionId: string;
}
