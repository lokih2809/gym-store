import { Role } from "@prisma/client";
import NextAuth from "next-auth";
declare module "next-auth" {
  export interface User {
    id: string;
    email: string;
    username: string;
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
