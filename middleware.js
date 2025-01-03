import { getToken } from "next-auth/jwt";

export async function middleware(req) {
  const data = await getToken({ req });
  console.log(`middleware token: ${data}`);
}