import { roleController } from "@/app/backend/controllers/roleController";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const role = await roleController.createRole(request)
    return NextResponse.json(
      { data: role },
      { status: 201 }
    )
  } catch (error) {
    return NextResponse.json(
      {
        status: "error",
        error: error,
        message: `An unexpected error occurred`,
      },
      { status: 500 }
    );
  }
}