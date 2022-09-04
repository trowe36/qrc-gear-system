// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import {PrismaClient} from "@prisma/client"

import {prisma} from "../../prisma/prismaConfig"

type Data = {
  name: string
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
//TODO if status = available. set the the available date field to today(
  //TODO generate QR button on admin submits response, shouldnt do this 

  const updateGear = await prisma.gear.create({
    data: {
      category : req.body.data.itemCategory,
      name : req.body.data.name,
      date_entered : req.body.data.dateEntered,
      admin : req.body.data.user,
      remaining_life : parseInt(req.body.data.remainingLife),
      quality : parseInt(req.body.data.currentQuality),
      signoff_required : req.body.data.requiredSignoff,
      status : req.body.data.status,
      parent_ID: parseInt(req.body.data.parentKitID) ,
      location: req.body.data.location,
      comments  : req.body.data.comments,
      borrow_count : req.body.data.borrow_count,
      code: req.body.genString
    },
  })
  console.log(updateGear)
  res.status(200).json({ name: 'John Doe' })
}
