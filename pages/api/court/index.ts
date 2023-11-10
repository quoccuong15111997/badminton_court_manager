import { NextApiRequest, NextApiResponse } from "next/types";
import prisma from "../../../lib/prisma";
import bcrypt from "bcrypt";
import authMiddleware from "../../../middleware/authMiddleware";
const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "GET") {
    try {
      const courts = await prisma.court.findMany({
        orderBy: [
          {
            id: "asc",
          },
        ],
      });
      res.status(200).json(courts);
    } catch (error) {
      res.status(500).json({ error: error! });
    }
  }
  if (req.method === "POST") {
    try {
      const court = await prisma.court.create({
        data: req.body,
      });
      res.status(200).json(court);
    } catch (error) {
      res.status(500).json({ error: error! });
    }
  }
};
export default authMiddleware(handler);
