import { userController } from "@/app/backend/controllers/auth/userController";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const user = await userController.login(request);
    return NextResponse.json({ data: user }, { status: 200 });
  } catch (error) {
    return {
      status: "error",
      data: error,
      message: `An unexpected error occurred`,
    };
  }
}
