import { prisma } from "../../../lib/dbConnect";
import { getSession } from "next-auth/react";

export default async function handler(req, res) {
  const { method } = req;
  const session = await getSession({ req });
  const { user } = req.query;
  const payload = req.body.data;

  if (session) {
    switch (method) {
      case "GET":
        try {
          const my_user = await prisma.user.findFirst({
            where: {
              id: user,
            },
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

          res.status(200).json({ success: true, data: my_user });
        } catch (error) {
          res.status(400).json({ success: false });
        }
        break;
      case "PUT":
        try {
          await prisma.user.update({
            where: {
              id: user,
            },
            data: {
              ...payload,
            },
          });
          res.status(201).json({ success: true, data: "Update Successful" });
        } catch (error) {
          console.log(error);
          if (error["meta"]["cause"]) {
            res
              .status(400)
              .json({ success: false, data: error["meta"]["cause"] });
          } else {
            res.status(400).json({ success: false, data: "Update Failed" });
          }
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
