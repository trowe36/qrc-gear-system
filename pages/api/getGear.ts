// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import {PrismaClient} from "@prisma/client"

const prisma = new PrismaClient()

type Data = {
  message: any
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {

    const gear = await prisma.gear.findMany({
        select : {
            id: true,
            name: true,
            category: true,
            date_entered: true,
            admin : true,
            signoff_required : true,
            status : true,
            parent_ID: true,
            location: true,
        }
      })
      //console.log(gear)

  res.status(200).json({message: gear})
}
