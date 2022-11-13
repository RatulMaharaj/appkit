import sha256 from "crypto-js/sha256";
import { prisma } from "../../../lib/dbConnect";

export default async function handler(req, res) {
  if (req.method === "POST") {
    // Getting email and password from body
    const { name, surname, username, password } = req.body;

    // Validate
    if (!username || !username.includes("@") || !password) {
      res.status(422).json({ message: "Invalid Data" });
      return;
    }

    // Check existing
    const checkExisting = await prisma.user.findUnique({
      where: { username: username.toLowerCase() },
    });

    // Send error response if duplicate user is found
    if (checkExisting) {
      res.status(422).json({ message: "User already exists" });
      return;
    }

    // Hash password and create user
    const hashed_pwd = sha256(password).toString();

    const user = await prisma.user.create({
      data: {
        name: name.toLowerCase(),
        surname: surname.toLowerCase(),
        username: username.toLowerCase(),
        password: hashed_pwd,
      },
    });
    // Send success response
    res.status(201).json({ message: "User created", data: user });
  } else {
    res.status(500).json({ message: "Route not valid", data: null });
  }
}
