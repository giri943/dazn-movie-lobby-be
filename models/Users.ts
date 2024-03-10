import mongoose, { Document } from 'mongoose';
import validator from 'validator';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

// Define the interface for the user document to include custom methods
interface UserDocument extends Document {
    userName: string;
    email: string;
    password: string;
    role: 'user' | 'admin';
    tokens: { token: string }[];
    generateAuthToken(): Promise<string>;
    getPublicProfile(): any;
}

const userSchema = new mongoose.Schema({
    userName: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        trim: true,
        lowercase: true,
        required: true,
        unique: true,
        validate: {
            validator: (value: string) => validator.isEmail(value),
            message: 'Email is invalid',
        },
    },
    password: {
        type: String,
        required: true,
        select: false,
        validate: {
            validator: (value: string) => validator.isStrongPassword(value),
            message: 'Password is not strong',
        },
    },
    role: {
        type: String,
        required: true,
        default: 'user',
        enum: ['user', 'admin'],
    },
    tokens: [{
        token: {
            type: String,
        },
    }],
}, { timestamps: true });

// Custom methods
userSchema.methods.generateAuthToken = async function (this: UserDocument) {
    const user = this;
    const token = jwt.sign({ _id: user._id.toString() }, process.env.JWT_SALT);
    user.tokens = user.tokens.concat({ token });
    await user.save();
    return token;
};

userSchema.methods.getPublicProfile = function (this: UserDocument) {
    const user = this;
    const userObject = user.toObject();
    delete userObject.password;
    delete userObject.tokens;
    return userObject;
};

userSchema.statics.findByCredentials = async function (this: mongoose.Model<UserDocument>, email: string, password: string) {
    const user = await this.findOne({ email });
    if (!user) {
        throw new Error('Unable to login');
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
        throw new Error('Unable to login');
    }
    return user;
};

// Hash password before saving
userSchema.pre<UserDocument>('save', async function (next) {
    const user = this;
    if (user.isModified('password')) {
        user.password = await bcrypt.hash(user.password, 8);
    }
    next();
});

export const User = mongoose.model<UserDocument>('User', userSchema);
export default User;
