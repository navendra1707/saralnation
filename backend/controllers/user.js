import User from "../models/user.js";
import bcrypt from 'bcrypt';
import jwt from "jsonwebtoken";

export const register = async (req, res) => {
    try {
        const {email, password} = req.body;

        const salt = await bcrypt.genSalt(); //it provides a random salt, i.e., number of rounds of hashing
        const passwordHash = await bcrypt.hash(password, salt);

        const user = new User({
            email,
            password: passwordHash
        });

        await user.save();
        res.status(201).json({
            user
        });
    } catch (err) {
        res.status(404).json({
            message: err.message
        })
    }
}

export const login = async (req,res) => {
    try {
        const {email, password} = req.body;
        const user = await User.findOne({ email: email });
        if(!user) return res.status(400).json({message: 'User does not exists.'});

        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch) return res.status(400).json({ message: "Invalid credentials." });

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET); // sign the token with user id and use a key JWT_SECRET
        delete user.password // so that it is not sent back to frontend in res
        res.status(200).json({ 
            message: "logged in successfully",
            token, 
            user 
        });
    } catch(err) {
        res.status(500).json({
            error: err.message
        });
    }
}