const express = require('express')
const router = express.Router()
const favouriteCont = require('../controller/favourite')
const userAuth = require('../middleware/userAuth')

router.post('/product/:productId/user/:userId',userAuth.userAuth,favouriteCont.postProductToFavourite)

module.exports = router