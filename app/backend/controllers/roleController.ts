import { addRoleSchema } from "../dto/role/roleDto"
import { roleService } from "../services/roleService"

export const roleController = {
  async createRole(request: Request) {
    try {
      const body = await request.json()
      const validatedData = addRoleSchema.parse(body)
      const roleResponse = await roleService.createRole(validatedData)
      return roleResponse
    } catch (error) {
      return {
        status: "error",
        data: error,
        message: `An unexpected error occurred`,
      };
    }
  },

  async getRoles() {
    try {
      const rolesResponse = await roleService.getRoles()
      return rolesResponse
    } catch (error) {
      return {
        status: "error",
        data: error,
        message: `An unexpected error occurred`,
      };
    }
  }
}