import { PrismaClient, User } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";

import Service from "../../../lib/Service";

const prisma = new PrismaClient();

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const service = new Service<User>({ req, res });

  await service.setPermissions(() => {
    return {};
  });

  service.hooks({
    find: async (query) => {
      return await prisma.user.findMany({
        where: query,
      });
    },
  });
};

export default handler;
