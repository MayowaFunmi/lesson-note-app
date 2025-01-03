import { prisma } from "@/lib/prisma";
import { AddRoleDto } from "../dto/role/roleDto";

export const roleService = {
  async createRole(data: AddRoleDto) {
    try {
      const { name } = data
      const roleExists = await prisma.role.findUnique({
        where: { name: name.toLowerCase() }
      });

      if (!roleExists) {
        const role = await prisma.role.create({
          data: { name: name.toLowerCase() }
        })
        return {
          status: "success",
          message: `Role ${name} added successfully`,
          data: role
        }
      }
      return {
        status: "conflict",
        message: `Role ${name} already exists`,
      }
    } catch (error) {
      console.error("Error creating user:", error);
      return {
        status: "error",
        message: "An unexpected error occurred.",
        data: error,
      };
    }
  },

  async getRoles() {
    try {
      const roles = (await prisma.role.findMany());
      return {
        status: "success",
        message: "Roles retrieved successfully",
        data: roles
      }
    } catch (error) {
      console.error("Error getting roles:", error);
      return {
        status: "error",
        message: "An unexpected error occurred.",
        data: error,
      };
    }
  }
}