export interface IAddress {
  id?: string;
  road: string;
  number: string;
  complement: string;
  city: string;
  state: string;
}

export interface IAddressUpdate {
  road?: string;
  number?: string;
  complement?: string;
  city?: string;
  state?: string;
}
