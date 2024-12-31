import User from "../models/User.js";
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
export async function login(req, res){
    try {
        const {email, password} = req.body;
        if(!email||!password) return res.json('enter valid credentials');
        const user = await User.findOne({email: email})
        if(!user) return res.json('invalid email');
        if(!await bcrypt.compare(password, user.password)) return res.json('invalid password');
        const payloadUser = {
            user
        }
        const token = jwt.sign(payloadUser, process.env.JWT_SECRET);
        return res.status(200).json({message:'login successful', token});

    } catch (error) {
        console.log(error.message)
        return res.sendStatus(500);
    }
}

export async function register(req, res){
    try {
        const { email, name, password} = req.body;
        const user = await User.findOne({ email: email});
        if(user) return res.json('user already exists');
        const hashedPassword = await bcrypt.hash(password, 10)
        const newUser = {
            name,
            email,
            password:hashedPassword
        }
        const createdUser = await User.create(newUser);        
        return res.status(201).json('user created');
    } catch (error) {
        console.log(error.message)
        return res.sendStatus(500);
    }
}

export async function getProfile(req, res) {
    try {
        const {email} = req.user;
        const userProfile = await User.findOne({ email: email});
        delete userProfile._doc.password;
        return res.status(200).json(userProfile);
    } catch (error) {
        console.log(error.message);
        return res.sendStatus(500);
    }
}