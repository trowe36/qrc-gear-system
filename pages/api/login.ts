// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
// SELECT * FROM cliffhangers.members WHERE email = 'patrick.ryanallen@connect.qut.edu.au';
// testing with this member .... patrick.ryanallen@connect.qut.edu.au   password = password
//
import type { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";
const phpbb = require("phpbb-password");

const prisma = new PrismaClient();

type Data = {
  message: any;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const [email, pass] = Object.values(req.body);
  const dbPass =
    await prisma.$queryRaw`SELECT password FROM members WHERE email=${email}`;
  if (dbPass[0] !== null && dbPass[0] !== undefined) {
    const hasCorrectPassword = await phpbb.check_hash(
      pass || "",
      Object.values(dbPass[0]).toString()
    );
    if (!hasCorrectPassword) {
      res.status(401).json({ message: "Email Exists but password incorrect" });
    } else {
      //localStorage.setItem('user', {email.toString()})

      res.status(200).json({ message: "Success - Password Match" });
    }
    //email correct, pass correct
  } else {
    res.status(404).json({ message: " email not found" });
    //user with that email address currently not registered.
  }
}
