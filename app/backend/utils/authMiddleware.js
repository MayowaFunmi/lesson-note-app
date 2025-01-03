import { NextResponse } from "next/server";
import { verifyJWT } from "../providers/jwtProvider";

export function authMiddleware(handler, options = []) {
  console.log(`options = ${JSON.stringify(options)}`);
  return async (req) => {
    try {
      const authHeader = req.headers.get("Authorization");
      if (!authHeader || !authHeader.startsWith("Bearer")) {
        return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
      }

      const token = authHeader.split(" ")[1];
      const decoded = verifyJWT(token);

      if (options.length) {
        const userRoles = decoded.roles;
        const hasAccess = options.some((role) =>
          userRoles.includes(role)
        );
        if (!hasAccess) {
          return NextResponse.json({ message: "Forbidden" }, { status: 403 });
        }
      }

      req.user = decoded;
      return await handler(req);
    } catch (error) {
      console.error("Authentication error:", error);
      return NextResponse.json({ error: "Authentication failed" }, { status: 401 });
    }
  };
}
