// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { PrismaClient, Tag, User } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";

const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Tag | null>
) {
  res.status(200).json(await prisma.tag.findFirst());
}
