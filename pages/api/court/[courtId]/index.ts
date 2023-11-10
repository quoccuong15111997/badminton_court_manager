import { NextApiRequest, NextApiResponse } from "next/types";
import prisma from "../../../../lib/prisma";
import authMiddleware from "../../../../middleware/authMiddleware";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method == "GET") {
    try {
      const court = await prisma.court.findUnique({
        where: {
          id: parseInt(req.query.courtId as string),
        },
      });
      if (court) {
        res.status(200).json(court);
      } else {
        res.status(404).json("Court not found");
      }
    } catch (error) {
      res.status(500).json({ error: error! });
    }
  }
  if (req.method === "PUT") {
    try {
      const { name, isActive, type } = req.body;
      const court = await prisma.court.update({
        where: {
          id: parseInt(req.query.courtId as string),
        },
        data: req.body,
      });
      if (court) {
        res.status(200).json(court);
      } else {
        res.status(404).send("Court not found");
      }
    } catch (error) {
      res.status(500).json({ error: error! });
    }
  }
};
export default authMiddleware(handler);
