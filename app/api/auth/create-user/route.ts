import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { hashPassowrd } from "../../providers/passwordHassh";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { username, email, phoneNumber, password } = body;
    if (!username || !email || !phoneNumber || !password) {
      return NextResponse.json(
        { error: "All fields are required" },
        { status: 400 }
      );
    }

    const userExists = await prisma.user.findFirst({
      where: {
        OR: [{ username }, { email }, { phoneNumber }],
      },
    });

    if (userExists) {
      return NextResponse.json(
        { status: "conflict", message: "User with username, email and/or phone number already exists" },
        { status: 400 }
      );
    }

    const hashedPassword = await hashPassowrd(password);
    if (!hashedPassword) {
      return NextResponse.json(
        { message: "password hash cannot be null" },
        { status: 400 }
      );
    }
    const user = await prisma.user.create({
      data: {
        username,
        email,
        phoneNumber,
        password: hashedPassword,
      },
    });

    return NextResponse.json(
      { status: "success", message: "User created successfully", data: user },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating user:", error);
    return NextResponse.json(
      { status: "An unexpected error occurred." },
      { status: 500 }
    );
  }
}
