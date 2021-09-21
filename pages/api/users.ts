import { PrismaClient } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";

import Service from "../../lib/Service";

const prisma = new PrismaClient();

const handler = (req: NextApiRequest, res: NextApiResponse) => {
  const service = new Service({ req, res });
  service.hooks({});
};

export default handler;
