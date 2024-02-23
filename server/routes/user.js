const express = require('express')
const router = express.Router()
const userCont = require('../controller/user')
const middleWare = require('../middleware/userAuth')
const adminAuth = require('../middleware/isAuth')

router.get('/all',adminAuth.adminAuth,userCont.getUsers)
router.get('/main/details',middleWare.userAuth,userCont.getMainInfo)
router.get('/:userId',middleWare.userAuth,userCont.getUser)

module.exports = router