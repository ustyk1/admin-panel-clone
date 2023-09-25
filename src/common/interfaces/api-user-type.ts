type Role = 'Administrators' | 'Users';
type Error = null | string[];

interface IConfig {
  [config: string]: string | boolean; 
}

interface ITokens {
  accessToken?: string | null;
  refreshToken?: string | null;
}

interface IResponseBase {
  response: {
  message: string;
  payload: string;
  isSuccess: boolean;
  errors: Error;
  accessToken: string;
  refreshToken: string;
  }
}

interface IUser {
  id: string;
  name: string;
  surname: string;
  email: string;
  phoneNumber: string | null;
  emailConfirmed: boolean;
  lockoutEnd: string | null;
  role: Role;
}

// Requests

interface IRegisterUser {
  firstName?: string | null;
  lastName?: string | null;
  email?: string | null;
  password?: string | null;
  confirmPassword?: string | null;
  roles?: string[] | null;
}

interface ILogin {
  email?: string | null;
  password?: string | null;
  rememberMe?: boolean;
}

interface IUpdateProfile {
  id?: string | null;
  firstName?: string | null;
  lastName?: string | null;
  email?: string | null;
  phone?: string | null;
}

interface IChangePassword {
  userId?: string | null;
  oldPassword?: string | null;
  newPassword?: string | null;
  confirmPassword?: string | null;
}

interface IUpdateUser extends IUpdateProfile {
  role: string | null;
}

interface IGetAllUsersResponse {
  response: {
    accessToken: string;
    refreshToken: string;
    message: string;
    payload: IUser[];
    isSuccess: boolean;
    errors: null;
  };
}

interface IGetAllNewsResponse {
  news: INews[];
}

interface INews {
  title?: string | null;
  author?: string | null;
  description?: string | null;
}

interface IGetNewsResponce extends IResponseBase{
  news: INews[];
}

export type {
  IConfig,
  ITokens,
  IUser,
  IRegisterUser,
  ILogin,
  IChangePassword,
  IUpdateProfile,
  IUpdateUser,
  IResponseBase,
  IGetAllUsersResponse,
  INews,
  IGetNewsResponce
}
