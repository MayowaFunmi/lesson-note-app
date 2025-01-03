// eslint-disable-next-line @typescript-eslint/no-require-imports
const pathModule = require("path");
// eslint-disable-next-line @typescript-eslint/no-require-imports
const prisma = require(pathModule.resolve(__dirname, "../lib/prisma"));


async function main() {
  const roles = ["admin", "teacher", "student", "parent", "superadmin", "supervisor"];

  for (const roleName of roles) {
    await prisma.role.upsert({
      where: { name: roleName },
      update: {},
      create: { name: roleName },
    })
  }

  console.log("Roles seeded successfully");
}

main()
  .catch((e) => console.error(e))
  .finally(async () => {
    await prisma.$disconnect();
  });