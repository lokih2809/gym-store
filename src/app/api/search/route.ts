import { NextResponse } from "next/server";
import prisma from "@/lib/client"; // Điều chỉnh đường dẫn theo cấu trúc của bạn

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get("query");

  if (!query || typeof query !== "string") {
    return NextResponse.json({ error: "Invalid query" }, { status: 400 });
  }

  try {
    const result = await prisma.product.findMany({
      take: 4,
      where: {
        name: {
          contains: query,
          mode: "insensitive",
        },
      },
      include: {
        colors: true,
        productSizes: true,
      },
    });

    return NextResponse.json(result);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 },
    );
  }
}
