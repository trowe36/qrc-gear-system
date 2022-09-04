// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import {PrismaClient} from "@prisma/client"
import { decryptData } from '../../util/util'
import {prisma} from "../../prisma/prismaConfig"
type Data = {
  signoffs: Array<object>
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  //const result = await prisma.$queryRaw`SELECT ID FROM members WHERE email = '${req.body.user.toString()}';`
  //const result2 = await prisma.$queryRaw`SELECT skill_id FROM logbook_signoffs WHERE member_id = 'result';`
  //console.log(result)
//console.log(req.body.user)
const userID = await prisma.members.findMany({
    select : {
        ID: true,
    },
    where : {
        email : req.body.user
    }
  })
  const result = await prisma.logbook_signoffs.findMany({
    select : {
        skill_id: true,
    },
    where : {
        member_id : userID[0].ID
    }
  })
  //console.log(result)

  res.status(200).json({signoffs: result})
}
