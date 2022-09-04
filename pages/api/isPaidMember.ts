// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import {PrismaClient} from "@prisma/client"

const prisma = new PrismaClient()

type Data = {
  message: string | null []
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
//get email

//get member_id where email=email
//from logbook signoff where member_id select skill_id

//SELECT * FROM cliffhangers2.members WHERE email = 'dev@qcrc.com';
const paystatus = await prisma.members.findMany({
    select : {
        status: true,
    },
    where : {
        email : req.body.user
    }
  })
  console.log(Object.values(paystatus[0]))
  res.status(200).json({message: Object.values(paystatus[0])})

}