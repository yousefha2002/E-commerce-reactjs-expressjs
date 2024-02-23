const express = require('express')
const router = express.Router()
const categoryCont = require('../controller/category')
const middleware = require('../middleware/isAuth')

/** for admin cPanel */
router.post('/create',middleware.adminAuth,categoryCont.createCategory)
router.get('/all',middleware.adminAuth,categoryCont.getCategories)

router.get('/user/all',categoryCont.getCategories)

module.exports = router