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

    const email = 'emelie@prisma.io'
    const result = await prisma.$queryRaw`SELECT max(id) FROM gear`
    console.log(result)

  res.status(200).json({message: result})
}
