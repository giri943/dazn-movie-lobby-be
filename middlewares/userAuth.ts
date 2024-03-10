import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import User from '../models/Users';

interface CustomRequest extends Request {
  token?: string;
  user?: any;
}

const userAuth = async (req: CustomRequest, res: Response, next: NextFunction) => {
  try {
    const token = req.header("Authorization")?.replace("Bearer ", "");    
    if (!token) {
      throw new Error();
    }
    const decoded: any = jwt.verify(token, process.env.JWT_SALT);  
    const user = await User.findOne({
      _id: decoded._id,
      "tokens.token": token,
    });    
    if (!user) {
      throw new Error();
    }
    req.token = token;
    req.user = user;
    next();
  } catch (e) {
    res.status(401).send({ error: "Unauthorized request, Please Authenticate" });
  }
};

export default userAuth;
