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

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const prisma = getPrisma();
  try {
    const restaurantId = params.id;

    if (!restaurantId) {
      return NextResponse.json(
        { error: "Restaurant ID is required" },
        { status: 400 }
      );
    }

    const restaurant = await prisma.restaurant.findUnique({
      where: {
        id: restaurantId,
      },
      include: {
        menuItems: true,
      },
    });

    if (!restaurant) {
      return NextResponse.json(
        { error: "Restaurant not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(restaurant);
  } catch (error) {
    console.error(`Error fetching restaurant ${params.id}:`, error);
    return NextResponse.json(
      { error: "Failed to fetch restaurant" },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}
