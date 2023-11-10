import { NextApiRequest, NextApiResponse } from "next/types";
import bcrypt from "bcrypt";
import prisma from "../../../../lib/prisma";
import authMiddleware from "../../../../middleware/authMiddleware";
import { CommonResponse } from "../../../../models/commonResponse";
const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const userId = req.query.userId;
  if (req.method === "GET") {
    try {
      const user = await prisma.user.findUnique({
        where: {
          id: parseInt(userId as string),
        },
        select: {
          id: true,
          username: true,
          email: true,
          password: false,
          name: true,
          phone: true,
        },
      });
      if (user) {
        res.status(200).json(new CommonResponse(true, "Read success", user));
      } else {
        res.status(404).json(new CommonResponse(false, "User Not Exits", ""));
      }
    } catch (error) {
      res.status(500).json({ error: error! });
    }
  }
  if (req.method === "PUT") {
    try {
      const { name, phone } = req.body;
      const user = await prisma.user.update({
        where: {
          id: parseInt(req.query.userId as string),
        },
        data: {
          name,
          phone,
        },
        select: {
          id: true,
          username: true,
          email: true,
          password: false,
          name: true,
          phone: true,
        },
      });
      if (user) {
        res.status(200).json(user);
      } else {
        res.status(404).send("User not found");
      }
    } catch (error) {
      res.status(500).json({ error: error! });
    }
  }
};
export default authMiddleware(handler);
