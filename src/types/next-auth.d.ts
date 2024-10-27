// types/next-auth.d.ts
import { Role } from "@prisma/client";
import NextAuth from "next-auth";

declare module "next-auth" {
  export interface User {
    id: number;
    username: string;
    phoneNumber?: string;
    address?: string;
    role: Role;
  }

  interface Session {
    user: User;
    expires: string;
  }
}
