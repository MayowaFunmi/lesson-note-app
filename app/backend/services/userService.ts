import { prisma } from "@/lib/prisma";
import { UserLoginDto, UserRegistrationDto } from "../dto/auth/userDto";
import { signJwt } from "../providers/jwtProvider";
import { hashPassowrd, validatePassword } from "../providers/passwordHassh";

export const userService = {
  async createUser(data: UserRegistrationDto) {
    try {
      const { username, email, phoneNumber, password } = data;

      const userExists = await prisma.user.findFirst({
        where: {
          OR: [{ username }, { email }, { phoneNumber }],
        },
      });

      if (userExists) {
        return {
          status: "conflict",
          message:
            "User with username, email and/or phone number already exists",
        };
      }

      const hashedPassword = await hashPassowrd(password);
      if (!hashedPassword) {
        return { message: "password hash cannot be null" };
      }

      const user = await prisma.user.create({
        data: {
          username,
          email,
          phoneNumber,
          password: hashedPassword,
          roles: {
            create: [
              {
                role: {
                  connect: {
                    name: "User",
                  },
                }
              }
            ]
          }
        },
      });

      return {
        status: "success",
        message: "User created successfully",
        data: user,
      };
    } catch (error) {
      console.error("Error creating user:", error);
      return {
        status: "error",
        message: "An unexpected error occurred.",
        data: error,
      };
    }
  },

  async login(data: UserLoginDto) {
    try {
      const { username, password } = data;

      const user = await prisma.user.findFirst({
        where: {
          OR: [{ email: username }, { phoneNumber: username }, { username }],
        },
        include: {
          roles: {
            include: {
              role: true
            }
          }
        }
      });

      if (!user) {
        return {
          status: "notFound",
          message: "User not found",
        };
      }

      const isValidPassword = await validatePassword(password, user.password);
      if (!isValidPassword) {
        return {
          status: "unauthorized",
          message: "Invalid password",
        };
      }

      const payload = {
        id: user.id,
        email: user.email,
        roles: user.roles.map((role) => role.role.name),
      };
      const token = signJwt(payload);
      return {
        status: "success",
        message: "User logged in successfully",
        data: token,
        user: user
      };
    } catch (error) {
      console.error("Error logging in user:", error);
      return {
        status: "error",
        message: "An unexpected error occurred.",
      };
    }
  },
};
