// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
// SELECT * FROM cliffhangers.members WHERE email = 'patrick.ryanallen@connect.qut.edu.au';
// testing with this member .... patrick.ryanallen@connect.qut.edu.au   password = password
//
import type { NextApiRequest, NextApiResponse } from 'next'
import {PrismaClient} from "@prisma/client"
const phpbb = require('phpbb-password');

const prisma = new PrismaClient()

type Data = {
  message: any
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
    const[email, pass] = Object.values(req.body)


    const dbPass = await prisma.$queryRaw`SELECT password FROM members WHERE email=${email}`
    
    if(dbPass[0] !== null && dbPass[0] !== undefined){
        //res.status(200).json({message: "found email"})
        //check pass and return status 
        //TODO implement encryption. 
        
        // const hasCorrectPassword = await phpbb.check_hash(pass || '', dbPass[0]);
        // var hash = phpbb.hash('password'); //= $H$9dcG77HyoRX.8CT2lRcoDB0RDq5bzO1 = patrick.ryanallen@connect.qut.edu.au
        // console.log(hash);
        // console.log('db pass is = ' + JSON.stringify(dbPass[0]) + ' should equal ' + hash);
        //     //email correct pass incorrect
        //     console.log(hasCorrectPassword)
            if(pass.toString() !== Object.values(dbPass[0]).toString()){
                res.status(401).json({message: "Email Exists but password incorrect"})
            }else{
                res.status(200).json({message: "Success - Password Match"})
            }
            //email correct, pass correct
    }else{
        res.status(404).json({message: " email not found"})
        //user with that email address currently not registered. 
    }
  
}
