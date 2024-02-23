const Product = require('../model/product')
const User = require('../model/user')

exports.postProductToFavourite = async(req,res,next)=>
{
    try{
        const {productId,userId} = req.params
        const user = await User.findById(userId)
        const product = await Product.findById(productId)
        if(!user || !product)
        {
            const error = new Error('item not found')
            error.statusCode = 404
            throw error
        }
        if(user.favourites.findIndex(prod=>prod.productId.toString()===productId.toString())===-1)
        {
            product.userFavourites.push({userId:userId})
            user.favourites.push({productId:productId})
        }
        else{
            product.userFavourites = product.userFavourites.filter(foundUser=>foundUser.userId.toString()!==userId.toString())
            user.favourites = user.favourites.filter(prod=>prod.productId.toString()!==productId.toString())
        }
        await user.save()
        await product.save()
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