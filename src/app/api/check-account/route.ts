import db from "@/lib/client";
import { NextRequest, NextResponse } from "next/server";

export default async function handler(req: NextRequest) {
  if (req.method !== "POST") {
    return NextResponse.json(
      { message: "Method Not Allowed" },
      { status: 405 },
    );
  }

  const { email, username } = await req.json();

  const emailExists = await db.user.findUnique({ where: { email } });
  const usernameExists = await db.user.findUnique({ where: { username } });

  if (emailExists) {
    return NextResponse.json(
      { exists: true, message: "Email already exists" },
      { status: 200 },
    );
  } else if (usernameExists) {
    return NextResponse.json(
      { exists: true, message: "Username already exists" },
      { status: 200 },
    );
  } else {
    return NextResponse.json({ exists: false }, { status: 200 });
  }
}
