const Order = require('../model/Order')
const User = require('../model/user')
exports.createOrder = async(req,res,next)=>
{
    try{
        const {shipping,userId} = req.body
        const user = await User.findById(userId).populate('cart.productId')
        let totalPrice = 5;
        const products = user.cart.map((product)=>
        {
            totalPrice+=product.qty*product.productId.price
            return {title:product.productId.title,image:product.productId.image,price:product.productId.price,qty:product.qty,
            color:product.color,size:product.size}
        })
        const order = new Order({products,totalPrice,...shipping,userId})
        await order.save()
        user.cart = []
        await user.save()
        res.status(200).json({message:"success"})
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

exports.getAllOrders = async(req,res,next)=>
{
    try{
        const orders = await Order.find().populate('userId')
        res.status(200).json({orders})
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

exports.getOrder = async(req,res,next)=>
{
    try{
        const {orderId} = req.params
        const order = await Order.findById(orderId).populate('userId')
        if(!order)
        {
            const error = new Error('order is not found')
            error.statusCode = 404
            throw error ;
        }
        res.status(200).json({order})
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

exports.delieverOrder = async(req,res,next)=>
{
    try{
        const {id} = req.params
        const order = await Order.findById(id)
        if(!order)
        {
            const error = new Error('order is not found')
            error.statusCode = 404
            throw error
        }
        order.isDelivered = true
        await order.save()
        res.status(201).json({message:"success"})
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

exports.getUserOrder = async(req,res,next)=>
{
    try{
        const {userId} = req.params
        const orders = await Order.find({userId:userId})
        res.status(200).json({orders})
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

exports.getLastOrders = async(req,res,next)=>
{
    try{
        const orders = await Order.find().sort({'createdAt':-1}).limit(5).populate('userId')
        res.status(200).json({orders})
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