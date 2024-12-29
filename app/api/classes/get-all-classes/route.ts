import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const results = await prisma.studentClass.findMany();
    return NextResponse.json(
      { data: results },
      { status: 200 }
    )
  } catch (error) {
    console.error("Error fetching student classes:", error);
    return NextResponse.json(
      { error: "An unexpected error occurred while fetching users." },
      { status: 500 }
    );
  }
}