import { prisma } from "@/lib/prisma";

export const addRoleToUser = async (userId: string, roleName: string) => {
  const role = await prisma.role.findUnique({
    where: { name: roleName },
  });

  if (!role) {
    throw new Error("Role not found");
  }

  const user = await prisma.user.findUnique({
    where: { id: userId },
  });

  if (!user) {
    throw new Error("User not found");
  }

  try {
    await prisma.userRole.create({
      data: {
        userId,
        roleId: role.id,
      },
    });
  } catch (error) {
    console.error("Error adding role to user:", error);
    throw new Error("An unexpected error occurred");
  }
};

export const removeRoleFromUser = async (userId: string, roleName: string) => {
  const role = await prisma.role.findUnique({
    where: { name: roleName },
  });

  if (!role) {
    throw new Error("Role not found");
  }

  const user = await prisma.user.findUnique({
    where: { id: userId },
  });

  if (!user) {
    throw new Error("User not found");
  }

  try {
    await prisma.userRole.deleteMany({
      where: {
        userId,
        roleId: role.id,
      },
    });
  } catch (error) {
    console.error("Error removing role from user:", error);
    throw new Error("An unexpected error occurred");
  }
};

export const getUserRoles = async (userId: string) => {
  const userRoles = await prisma.userRole.findMany({
    where: {
      userId,
    },
    include: {
      role: true,
    },
  });

  return userRoles.map((userRole) => userRole.role.name);
};
