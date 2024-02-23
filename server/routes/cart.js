const express = require('express')
const router = express.Router()
const cartCont = require('../controller/cart')
const userAuth = require('../middleware/userAuth')

router.put('/user/:userId/product/:productId',userAuth.userAuth,cartCont.addProductToCart)
router.delete('/user/:userId/:cartId',userAuth.userAuth,cartCont.deleteProductFromCart)

module.exports = router