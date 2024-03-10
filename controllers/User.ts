import User from '../models/Users';
import bcrypt from 'bcrypt'
import jwt from "jsonwebtoken"

export const createUser = (userData: any): Promise<{ user: any, token: string }> => {
    return new Promise(async (resolve, reject) => {
        const user = new User({ ...userData });
        try {
            await user.save();
            const token = await user.generateAuthToken();
            const userPublicData = user.getPublicProfile();
            resolve({ user: userPublicData, token });
        } catch (error) {
            reject(error);
        }
    });
};

export const loginUser = (userData: any): Promise<{ user: any }> => {
    return new Promise(async (resolve, reject) => {
        const email = userData.email
        try {
            const user = await User.findOne({ email }).select('+password').exec()
            if (!user) {
                reject("No user found")
            }
            const foundUserPassword = user.password
            const passwordChekResult = await bcrypt.compare(userData.password, foundUserPassword)
            if (!passwordChekResult) {
                reject('Password Authentication Failed');
            }
            if (user.tokens.length < 1) {
                const newToken = await jwt.sign({ _id: user._id.toString() }, process.env.JWT_SALT)
                user.tokens = user.tokens.concat({ token: newToken });
                await user.save()
            }
            let verifiedUseData: any = {
                _id: user._id,
                userName: user.userName,
                email: user.email,
                role: user.role,
                tokens: user.tokens
            }
            resolve(verifiedUseData)
        } catch (error) {

        }
    })
}

export const logoutUser = (userData: any): Promise<{ user: any }> => {
    return new Promise(async (resolve, reject) => {
        try {
            const user = await User.findById({ _id: userData.userId }).exec()
            if (!user) {
                reject("No user found")
            }
            user.tokens = []
            await user.save()
            resolve({ user })
        } catch (error) {
            console.log(error);
            reject(error)
        }
    })
}

