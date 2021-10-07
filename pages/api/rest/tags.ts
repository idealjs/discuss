import { PrismaClient, Tag } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";

import Service from "../../../lib/Service";

const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Tag | null>
) {
  res.status(200).json(await prisma.tag.findFirst());

  const service = new Service<Tag>({ req, res });

  await service.setPermissions(() => {
    return {};
  });

  service.hooks({
    get: async () => {
      return await prisma.tag.findMany();
    },
  });
}
