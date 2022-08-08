const User = require('../models/UserModel');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { readSync } = require('fs');
const SECRET_KEY = process.env.SECRET_KEY;

const signin = async (req, res, next) => {
    const { name, email, password, address, mobile_no, company, role, skills, certifications } = req.body;

    let existingUser;
    try {
        existingUser = await User.findOne({ email: email });
    } catch (error) {
        console.log(error);
    }

    if(existingUser){
        return res.status(401).json({message : "User account is already created, Please Login"});
    }

    const hashedPassword = bcrypt.hashSync(password);

    const user = new User({
        name,
        email,
        password : hashedPassword,
        address,
        mobile_no,
        company,
        role, 
        skills,
        certifications
    });

    try {
        await user.save();
    } catch (error) {
        console.log(error);
    }

    return res.status(201).json({message : "User account is created successfully"});
};

const login = async (req, res, next) =>{
    const {email, password} = req.body;
    let existingUser;

    try {
        existingUser = await User.findOne({email:email});
    } catch (error) {
        console.log(error);
    }

    if(!existingUser){
        return res.status(400).json({messgae : "Invalid User account, Please Signin"});
    }

    const isPasswordCorrect = bcrypt.compareSync(password, existingUser.password);

    if(!isPasswordCorrect){
        return res.status(404).json({message : "Password is not matched, please try again"});
    }

    const token = jwt.sign({id:existingUser.id}, SECRET_KEY, {
        expiresIn : "1hr"
    });

    // res.clearCookie(String(existingUser.email));

    res.cookie(String(existingUser.id), token, {
        expiresIn : new Date(Date.now() + 1000*60*60),
        httpOnly : true 
    });

    return res.status(201).json({message : "Successfully logged in", user  : existingUser, token});
};

const verifyUser = async (req, res, next) =>{
    const headers = req.headers.cookie;
    const token = headers.split('=')[1];
    
    jwt.verify(String(token), SECRET_KEY, (err, user)=>{
        if(err){
            return res.status(404).json({message : "Invalid token"});
        }
        req.id = user.id;
    });
    next();
};

const getUser = async (req, res, next)=>{
    const userID = req.id;
    let user;

    try {
        user = await User.findById(userID, "-password");
    } catch (error) {
        console.log(error);
    }
    if(!user){
        return res.status(404).json({message : "Invalid user"});
    }
    return res.status(201).json({user});
};

const logout = async (req, res, next) =>{
    const headers = req.headers.cookie;
    const token = headers.split('=')[1];

    if(!token){
        return res.status(404).json({message : "Token not found"});
    }

    jwt.verify(String(token), SECRET_KEY, (err, user)=>{
        if(err){
            return res.status(401).json({message: "Unauthorized token"});
        }

        res.clearCookie(`${user.id}`);
        req.cookies[`${user.id}`] = "";
        return res.status(200).json({message : "Logout is successful!"});
    });
};

exports.signin = signin;
exports.login = login;
exports.verifyUser = verifyUser;
exports.getUser = getUser;
exports.logout = logout;