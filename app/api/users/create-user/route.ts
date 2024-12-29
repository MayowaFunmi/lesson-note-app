import { NextResponse } from "next/server";
import { hashPassowrd } from "../../providers/passwordHassh";
import prisma from "@/lib/prisma";

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
        OR: [{ email }, { phoneNumber }],
      },
    });

    if (userExists) {
      return NextResponse.json(
        { message: "User with email and/or phone number exists" },
        { status: 400 }
      );
    }

    const hashedPassword = await hashPassowrd(password);
    if (!hashedPassword) {
      return NextResponse.json(
        { error: "password hash cannot be null" },
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

    const { password: _, ...userWithoutPassword } = user;
    console.log("password: ", _);
    return NextResponse.json(
      { message: "User created successfully", data: userWithoutPassword },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating user:", error);
    return NextResponse.json(
      { error: "An unexpected error occurred." },
      { status: 500 }
    );
  }
}
