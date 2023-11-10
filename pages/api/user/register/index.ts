import { NextApiRequest, NextApiResponse } from "next/types";
import bcrypt from "bcrypt";
import prisma from "../../../../lib/prisma";
const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "POST") {
    const { username, email, password, name, phone } = req.body;
    try {
      var passwordHash = await bcrypt.hash(password, 10);
      const user = await prisma.user.create({
        data: {
          username,
          email,
          password: passwordHash,
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
      res.status(200).json(user);
    } catch (e) {
      res.status(400).json({
        error: e!,
      });
    }
  } else {
    res.status(405).end();
  }
};
export default handler;
