import { userController } from "@/app/backend/controllers/auth/userController";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const user = await userController.register(request);
    return NextResponse.json(
      { data: user },
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
