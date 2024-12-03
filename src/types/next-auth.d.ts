import { Role } from "@prisma/client";
declare module "next-auth" {
  export interface User {
    id: number;
    email: string;
    name?: string;
    phoneNumber?: string;
    address?: string;
    role: Role;
  }

  interface Session {
    user: User;
    expires: string;
  }
}
