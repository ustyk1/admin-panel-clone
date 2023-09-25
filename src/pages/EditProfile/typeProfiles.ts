  export type Schema = {  //* /api/User/UpdateProfile
    // id: string
    firstName: string
    lastName: string
    email: string
    phone: number
  }

  export type SchemaPassword = {
    userId: string
    currentPassword: string
    newPassword: string
    confirmPassword: string
  }

export interface logicSelectedUser {
  id?: string;
  firstName?: string;
  lastName?: string;
  email?: string;
  phone?: number;
  roles?: string[];
}
