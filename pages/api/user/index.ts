import { NextApiRequest, NextApiResponse } from "next/types";
import prisma from "../../../lib/prisma";
import bcrypt from "bcrypt";
import authMiddleware from "../../../middleware/authMiddleware";
const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "GET") {
    try {
      const users = await prisma.user.findMany({
        select: {
          id: true,
          username: true,
          email: true,
          password: false,
          name: true,
          phone: true,
        },
      });
      res.status(200).json(users);
    } catch (error) {
      res.status(500).json({ error: error! });
    }
  }
};
export default authMiddleware(handler);
