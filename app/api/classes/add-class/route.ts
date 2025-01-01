import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    console.log("request body: ", body);

    const { name, level } = body;
    if (!name || !level) {
      return NextResponse.json(
        { error: "All fields are required" },
        { status: 400 }
      );
    }

    const result = await prisma.studentClass.create({
      data: {
        name, level
      }
    })
    return NextResponse.json(
      { data: result },
      { status: 201 }
    )
  } catch (error) {
    console.error("Error creating student class: ", error)
    return NextResponse.json(
      { error: "An error occurred" }, { status:500 }
    )
  }
}
