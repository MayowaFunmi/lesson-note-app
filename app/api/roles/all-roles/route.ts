import { roleController } from "@/app/backend/controllers/roleController";
import { authMiddleware } from "@/app/backend/utils/authMiddleware";
import { NextResponse } from "next/server";

const getAllRoles = async () => {
  try {
    const roles = await roleController.getRoles();
    return NextResponse.json({ data: roles }, { status: 200 });
  } catch (error) {
    return {
      status: "error",
      data: error,
      message: `An unexpected error occurred`,
    };
  }
}

export const GET = authMiddleware(getAllRoles, ["superadmin"]); // array is optional