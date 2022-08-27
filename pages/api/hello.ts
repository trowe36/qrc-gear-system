// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import {PrismaClient} from "@prisma/client"

const prisma = new PrismaClient()

type Data = {
  name: string
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  //const members = await prisma.members.findMany();
  //console.log(members);
  //console.log("kk" + Object.values(req.body));
  console.log(req.body.category);
  // comments: ""
  // currentQuality: ""
  // dateEntered: ""
  // id: ""
  // itemCategory: "QD"
  // location: "KP"
  // parentKitID: ""
  // remainingLife: ""
  // requiredSignoff: "topClimber"
  // status: "available"
  // user: ""
  const updateUser = await prisma.gear.create({
    data: {
      category : req.body.itemCategory,
      date_entered : req.body.dateEntered,
      admin : req.body.user,
      remaining_life : parseInt(req.body.remainingLife),
      quality : parseInt(req.body.currentQuality),
      signoff_required : req.body.requiredSignoff,
      status : req.body.status,
      parent_ID: parseInt(req.body.parentKitID) ,
      location: req.body.location,
      comments  : req.body.comments,
      borrow_count : req.body.borrow_count
    },
  })

  res.status(200).json({ name: 'John Doe' })
}
