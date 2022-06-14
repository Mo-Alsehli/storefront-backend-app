import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv'

dotenv.config();

const jwtAuth = (req: Request, res: Response, next: Function) => {
    try {
        const authorizationHead = req.headers.authorization;
        const token = authorizationHead?.split(' ')[1] as string;
        if(token){
            let result = jwt.verify(token, process.env.TOKEN_SECRET as string);
        }else{
            res.send('No Token Provided');
            console.log('No Token Provided');
        }
        next();
    } catch (error) {
        res.status(401);
        res.json(`Access denied, Invalid token. ${error}`);
        console.log(error);
    }
}
export default jwtAuth;