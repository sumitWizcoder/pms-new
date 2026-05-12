import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

// This is a custom "Type" that adds the userId to the Request object
// This way, we can access the logged-in user in any protected route
export interface AuthRequest extends Request {
  userId?: string;
}

export const authMiddleware = (
  req: AuthRequest,
  res: Response,
  next: NextFunction,
) => {
  try {
    // 1. Get the token from the Header
    // It usually looks like: "Bearer [TOKEN_STRING]"
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ message: "Authentication required" });
    }

    const token = authHeader.split(" ")[1];

    // 2. Verify the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as {
      userId: string;
    };

    // 3. Attach the userId to the request and move to the next step
    req.userId = decoded.userId;
    next();
  } catch (error) {
    return res.status(401).json({ message: "Invalid or expired token" });
  }
};
