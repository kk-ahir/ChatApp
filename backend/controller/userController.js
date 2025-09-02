import User from '../models/userSchema.js';
import bcrypt from 'bcryptjs';
import { createTokenAndSaveCookie } from '../jwt/generateToken.js';
import { secureRoute } from '../middleware/secureRoute.js';


export const signup = async (req, res) => {
    try {
        const { name, email, password, confirmpassword } = req.body;
        // Check if passwords match
        if (password !== confirmpassword) {
            return res.status(400).json({ message: "Passwords do not match" });
        }
        // Check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "Email already exists" });
        }
        // hashing password 
        const hashpass = await bcrypt.hash(password, 10);

        // Create new user
        const newUser = new User({
            name,
            email,
            password: hashpass
        });

        await newUser.save();
        if (newUser) {
            createTokenAndSaveCookie(newUser._id, res);
            res.status(201).json({
                message: "User registered successfully", newUser: {
                    _id: newUser._id,
                    name: newUser.name,
                    email: newUser.email
                }
            });
        }

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
};

export const login = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });

        const isMatched = await bcrypt.compare(password, user.password);

        if (!user || !isMatched) {
            return res.status(404).json({ message: "invalid password or user" });
        }

        createTokenAndSaveCookie(user._id, res);
        res.status(201).json({
            message: "User login successfully", user: {
                _id: user._id,
                name: user.name,
                email: user.email
            }
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
}

export const logout = (req, res) => {
    try {
        res.clearCookie("jwt", {
            httpOnly: true,
            secure: true,
            sameSite: "strict",
        });
        res.status(201).json({ message: "logout successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
}

export const getUserProfile = async (req, res) => {
    try {
        const loggedUser = req.user._id;
        console.log(loggedUser)
        const filterUser = await User.find({ _id: { $ne: loggedUser } }).select("-password");
        res.status(201).json({ filterUser });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
}
