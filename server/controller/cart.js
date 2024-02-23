const User = require('../model/user')

exports.addProductToCart = async(req,res,next)=>
{
    try{
        const {userId,productId} = req.params
        const {qty,color,size} = req.body
        if(userId!==req.userId)
        {
            const error = new Error('you can not do actions')
            error.statusCode = 401
            throw error ;
        }
        const user = await User.findById(userId)
        if(!user)
        {
            const error = new Error('user is not found')
            error.statusCode = 404
            throw error ; 
        }
        user.cart.push({color,size,qty,productId:productId})
        await user.save()
        res.status(201).json({message:"product has added to cart"})
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

exports.deleteProductFromCart = async(req,res,next)=>
{
    try{
        const {userId,cartId} = req.params
        if(userId!==req.userId)
        {
            const error = new Error('you can not do actions')
            error.statusCode = 401
            throw error ;
        }
        const user = await User.findById(userId)
        if(!user)
        {
            const error = new Error('user is not found')
            error.statusCode = 404
            throw error ; 
        }
        user.cart = user.cart.filter(item=>item._id.toString()!==cartId.toString())
        await user.save()
        res.status(201).json({message:"product has removed to cart"})
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