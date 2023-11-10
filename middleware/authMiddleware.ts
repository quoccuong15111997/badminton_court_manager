import { JwtPayload, verify } from "jsonwebtoken";
import { NextApiHandler, NextApiResponse, NextApiRequest } from "next/types";
import { TokenInterface } from "../interfaces/tokenInterface";
const authMiddleware =
  (handler: NextApiHandler) =>
  async (req: NextApiRequest, res: NextApiResponse) => {
    const token = req.headers.authorization?.replace("Bearer ", "");
    if (!token) {
      return res.status(401).json({
        error: "Unauthorized",
      });
    }
    try {
      const decodedToken = verify(token, "your-secret-key");
      req.userId = (decodedToken as TokenInterface).userId;
      return handler(req, res);
    } catch (error) {
      return res.status(401).json({
        error: "Unauthorized",
      });
    }
  };
export default authMiddleware;
