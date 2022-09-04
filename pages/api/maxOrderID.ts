// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import {PrismaClient} from "@prisma/client"

import {prisma} from "../../prisma/prismaConfig"

type Data = {
  message: string
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
    const result = await prisma.$queryRaw`SELECT max(id) FROM gear_orders`
    console.log( "max order id" + Object.values(result[0]))

  res.status(200).json({message: result as string})
}