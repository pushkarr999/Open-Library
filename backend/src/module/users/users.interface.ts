export interface ICreateUser {
  name: string;
  email: string;
  password?: string;
}

export interface IGetUser {
  email: string;
}
