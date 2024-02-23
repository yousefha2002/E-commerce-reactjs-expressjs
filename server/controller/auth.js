const jwt = require('jsonwebtoken')
const Admin = require('../model/Admin')
const User = require('../model/user')
const bcrypt = require('bcryptjs')

exports.registerAdmin = async(req,res,next)=>
{
    try{
        const {email,password} = req.body
        const admin = await Admin.findOne({email:email})
        if(admin)
        {
            const error = new Error('email is exist')
            error.statusCode = 403
            throw error
        }
        const hashPass = await bcrypt.hash(password,12)
        const newAdmin = new Admin({email,password:hashPass})
        await newAdmin.save()
        res.status(201).json({message:"account has created"})
    }
    catch(err)
    {
        if(!err.statusCode)
        {
            err.statusCode = 500
        }
        next(err)
    }  
}

exports.loginAdmin = async(req,res,next)=>
{
    try{    
        const {email,password} = req.body
        const admin = await Admin.findOne({email:email})
        if(!admin)
        {
            const error = new Error('email is not exist')
            error.statusCode = 403
            throw error
        }
        const isMatch = await bcrypt.compare(password,admin.password)
        if(!isMatch)
        {
            const error = new Error('password is not true')
            error.statusCode = 403
            throw error
        }
        const token = jwt.sign({adminId:admin._id},"secret")
        res.status(200).json({token,admin})
    }
    catch(err)
    {
        if(!err.statusCode)
        {
            err.statusCode = 500
        }
        next(err)
    }  
}

exports.loginUser = async(req,res,next)=>
{
    try{    
        const {email,password} = req.body
        const user = await User.findOne({email:email})
        if(!user)
        {
            const error = new Error('email is not exist')
            error.statusCode = 403
            throw error
        }
        const isMatch = await bcrypt.compare(password,user.password)
        if(!isMatch)
        {
            const error = new Error('password is not true')
            error.statusCode = 403
            throw error
        }
        const token = jwt.sign({userId:user._id},"secret")
        res.status(200).json({token,user})
    }
    catch(err)
    {
        if(!err.statusCode)
        {
            err.statusCode = 500
        }
        next(err)
    }  
}

exports.registerUser = async(req,res,next)=>
{
    try{
        const {email,password,name} = req.body
        const user = await User.findOne({email:email})
        if(user)
        {
            const error = new Error('email is exist')
            error.statusCode = 403
            throw error
        }
        const hashPass = await bcrypt.hash(password,12)
        const newUser = new User({email,password:hashPass,name})
        await newUser.save()
        res.status(201).json({message:"account has created"})
    }
    catch(err)
    {
        if(!err.statusCode)
        {
            err.statusCode = 500
        }
        next(err)
    }  
}
