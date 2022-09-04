// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import {PrismaClient} from "@prisma/client"

import {prisma} from "../../prisma/prismaConfig"

type Data = {
  message: any
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {

    const email = 'emelie@prisma.io'
    const result = await prisma.$queryRaw`SELECT max(id) FROM gear` 

  res.status(200).json({message: result})
}
