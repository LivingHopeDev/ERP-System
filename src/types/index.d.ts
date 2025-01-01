declare module "express-serve-static-core" {
  interface Request {
    user?: User;
  }
}

export interface IUserSignUp {
  name: string;
  email: string;
  password: string;
}
export interface IUserLogin {
  email: string;
  password: string;
}

export interface IEmployee {
  name: string;
  email: string;
  role: string;
  salary: number;
  department: string;
  joiningDate: string;
}
