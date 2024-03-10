import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import User from '../models/Users';

interface CustomRequest extends Request {
  token?: string;
  admin?: any;
}

const adminAuth = async (req: CustomRequest, res: Response, next: NextFunction) => {
  try {
    const token = req.header("Authorization")?.replace("Bearer ", "");    
    if (!token) {
      throw new Error();
    }
    const decoded: any = jwt.verify(token, process.env.JWT_SALT);    
    const admin = await User.findOne({
      _id: decoded._id,
      "tokens.token": token,
      role: "admin"
    });
    if (!admin) {
      throw new Error();
    }
    req.token = token;
    req.admin = admin;
    next();
  } catch (e) {
    res.status(401).send({ error: "Unauthorized request, Please Authenticate" });
  }
};

export default adminAuth;
