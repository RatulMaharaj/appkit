import { prisma } from "../../../lib/dbConnect";
import { getSession } from "next-auth/react";

export default async function handler(req, res) {
  const { method } = req;
  const session = await getSession({ req });

  if (session) {
    switch (method) {
      case "GET":
        try {
          const users = await prisma.user.findMany({
            // we do this to do pull back passwords
            select: {
              id: true,
              name: true,
              surname: true,
              username: true,
              image: true,
              position: true,
              role: true,
            },
          });
          res.status(200).json({ success: true, data: users });
        } catch (error) {
          console.log(error);
          res.status(400).json({ success: false });
        }
        break;
      case "POST":
        try {
          await prisma.user.create({
            data: req.body,
          });
          res.status(201).json({ success: true });
        } catch (error) {
          console.log(error);
          res.status(400).json({ success: false });
        }
        break;
      default:
        res.status(400).json({ success: false });
        break;
    }
  } else {
    res.status(401).send("Unauthorized");
  }
}
