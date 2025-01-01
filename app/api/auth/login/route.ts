import { signJwt } from "@/app/api/providers/jwtProvider";
import { validatePassword } from "@/app/api/providers/passwordHassh";
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server"

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { username, password } = body;

    const user = await prisma.user.findFirst({
      where: {
        OR: [{ email: username }, { phoneNumber: username }, { username }],
      },
    })

    // if (!body.email || !body.username || !body.phoneNumber) {
    //   return NextResponse.json(
    //     { message: "Username or phone number or email is required to log in" },
    //     { status: 401}
    //   )
    // }

    // let user;
    // let message;
    // if (body.email) {
    //   user = await prisma.user.findUnique({
    //     where: { email: body.email }
    //   });
    //   message = "User with email not found";
    // } else if (body.username) {
    //   user = await prisma.user.findUnique({
    //     where: { username: body.username }
    //   })
    //   message = "User with username not found";
    // } else if (body.phoneNumber) {
    //   user = await prisma.user.findUnique({
    //     where: { phoneNumber: body.phoneNumber }
    //   })
    //   message = "User with phone number not found";
    // }

    if (!user) {
      return NextResponse.json(
        { message: "Invalid user credentials" },
        { status: 404}
      )
    }

    const isValidPassword = await validatePassword(password, user.password)
    if (!isValidPassword) {
      return NextResponse.json(
        { message: "Invalid password"},
        { status: 404 }
      )
    }

    const payload = {
      id: user.id,
      email: user.email
    }
    const token = signJwt(payload)
    return NextResponse.json(
      { status: "success", message: "Login Successful", token: token, user: user },
      { status: 201 }
    )
  } catch (error) {
    console.error("Error logging in:", error);
    return NextResponse.json(
      { error: "An error occurred while logging in" },
      { status: 500 }
    );
  }
}