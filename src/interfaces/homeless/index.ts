interface IHomeless {
  name: string;
  age: string;
  created_at: Date;
  updated_at: Date;
  picture?: string;
  intitution: string;
};

interface IHomelessRequest {
  name: string;
  age: string;
  picture?: string;
  institution: string;
};

interface IHomelessUpdate {
  name?: string;
  age?: string;
  picture?: string;
};

export { IHomeless, IHomelessRequest, IHomelessUpdate };