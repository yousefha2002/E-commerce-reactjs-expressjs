const express = require('express')
const router = express.Router()
const orderCont = require('../controller/order')
const middleWare = require('../middleware/userAuth')
const adminAuth = require('../middleware/isAuth')

router.post('/create',middleWare.userAuth,orderCont.createOrder)
router.get('/all',adminAuth.adminAuth,orderCont.getAllOrders)
router.get('/single/:orderId',adminAuth.adminAuth,orderCont.getOrder)
router.get('/user/single/:orderId',middleWare.userAuth,orderCont.getOrder)
router.put('/deliver/:id',adminAuth.adminAuth,orderCont.delieverOrder)
router.get('/all/:userId',middleWare.userAuth,orderCont.getUserOrder)
router.get('/last/all',adminAuth.adminAuth,orderCont.getLastOrders)

module.exports = router