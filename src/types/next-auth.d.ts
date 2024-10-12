import { Role } from "@prisma/client";
import NextAuth from "next-auth";

declare module "next-auth" {
  interface User {
    username: string;
    role: Role;
  }
  interface Session {
    user: User & {
      username: string;
      role: Role;
    };
    token: {
      username: string;
      role: Role;
    };
  }
}
