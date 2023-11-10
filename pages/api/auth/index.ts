import { compare } from "bcrypt";

import prisma from "../../../lib/prisma";
import jwt from "jsonwebtoken";
import { CommonResponse } from "../../../models/commonResponse";
import { NextApiRequest, NextApiResponse } from "next/types";
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const { email, password } = req.body;
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user || !(await compare(password, user.password))) {
      res.status(400).json({
        error: "Invalid credentials",
      });
    }
    const token = jwt.sign({ userId: user!.id }, "your-secret-key", {
      expiresIn: "24h", // Thời gian sống của token
    });
    var resUser = await prisma.user.findUnique({
      where: { id: user!.id },
      select: {
        id: true,
        username: true,
        email: true,
        password: false,
        name: true,
        phone: true,
      },
    });
    res
      .status(200)
      .json(
        new CommonResponse(true, "Login success", { user: resUser, token })
      );
  } else {
    res.status(405).end();
  }
}
