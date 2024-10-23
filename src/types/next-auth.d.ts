import { Role } from "@prisma/client";
import NextAuth from "next-auth";

declare module "next-auth" {
  interface User {
    username: string;
    phoneNumber: string?;
    address: string?;
    role: Role;
  }
  interface Session {
    user: User & {
      username: string;
      phoneNumber: string?;
      address: string?;
      role: Role;
    };
    token: {
      username: string;
      phoneNumber: string?;
      address: string?;
      role: Role;
    };
  }
}
