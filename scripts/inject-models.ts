/* eslint-disable @typescript-eslint/no-require-imports */
// import fs from "fs";
// import path from "path";

const fs = require('fs');
const path = require('path');

const modelsDir = path.join(process.cwd(), "prisma/models");
const schemaPath = path.join(process.cwd(), "prisma/schema.prisma");

const injectModels = () => {
  const modelFiles: string[] = fs
    .readdirSync(modelsDir)
    .filter((file: string) => file.endsWith(".prisma"));

  const models = modelFiles
    .map((file) => fs.readFileSync(path.join(modelsDir, file), "utf-8"))
    .join("\n\n");

  const schemaTemplate = `
    datasource db {
      provider = "mysql"
      url      = env("DATABASE_URL")
    }
  
    generator client {
      provider = "prisma-client-js"
    }
  
    ${models}
    `.trim();

  fs.writeFileSync(schemaPath, schemaTemplate);
  console.log("Models injected into schema.prisma!");
};

injectModels()