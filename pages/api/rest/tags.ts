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
    find: async (query) => {
      return await prisma.tag.findMany({
        where: query,
      });
    },
    create: async (data) => {
      return await prisma.tag.create({ data });
    },
    upsert: async (id, data) => {
      return await prisma.tag.upsert({
        where: { id },
        create: data,
        update: data,
      });
    },
    patch: async (id, data) => {
      return await prisma.tag.update({
        where: {
          id,
        },
        data,
      });
    },
    remove: async (id) => {
      return await prisma.tag.delete({
        where: {
          id,
        },
      });
    },
  });
}
