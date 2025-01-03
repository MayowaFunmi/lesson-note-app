import { ZodError } from "zod";
import { userRegistrationSchema } from "../../dto/auth/userDto";
import { userService } from "../../services/userService";

export const userController = {
  async register(request: Request) {
    try {
      const body = await request.json();
      const validatedData = userRegistrationSchema.parse(body);
      const userResponse = await userService.createUser(validatedData);
      return userResponse;
    } catch (error) {
      if (error instanceof ZodError) {
        const validationErrors = error.errors.map((error) => {
          return {
            field: error.path.join("."),
            message: error.message,
          };
        });
        return {
          status: "error",
          message: "Validation error",
          data: validationErrors,
        };
      }
      return {
        status: "error",
        data: error,
        message: `An unexpected error occurred`,
      };
    }
  },

  async login(request: Request) {
    try {
      const body = await request.json();
      const userResponse = await userService.login(body);
      return userResponse;
    } catch (error) {
      return {
        status: "error",
        data: error,
        message: `An unexpected error occurred`,
      };
    }
  },
};
