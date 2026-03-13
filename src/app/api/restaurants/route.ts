import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

let prismaInstance: PrismaClient;

function getPrisma() {
  if (!prismaInstance) {
    prismaInstance = new PrismaClient();
  }
  return prismaInstance;
}

export const dynamic = "force-dynamic";

export async function GET() {
  const prisma = getPrisma();
  try {
    const restaurants = await prisma.restaurant.findMany({
      include: {
        menuItems: true,
      },
      orderBy: {
        rating: "desc",
      },
    });

    return NextResponse.json(restaurants);
  } catch (error) {
    console.error("Error fetching restaurants:", error);
    return NextResponse.json(
      { error: "Failed to fetch restaurants" },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}
