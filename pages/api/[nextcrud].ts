import NextCrud, { PrismaAdapter } from "@premieroctet/next-crud";
import { prisma } from "../../lib/dbConnect";

const handler = async (req, res) => {
  const nextCrudHandler = await NextCrud({
    adapter: new PrismaAdapter({
      prismaClient: prisma,
    }),
  });
  return nextCrudHandler(req, res);
};
export default handler;
