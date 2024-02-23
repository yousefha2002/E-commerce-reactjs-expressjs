const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const orderSchema = new Schema({
    userId:{type:mongoose.Types.ObjectId,required:true,ref:"User"},
    totalPrice:{type:Number,required:true},
    products:[
        {
            title:{type:String,required:true},
            image:{type:String,required:true},
            qty:{type:Number,required:true},
            price:{type:Number,required:true},
            color:{type:String,required:true},
            size:{type:String,required:true}
        }
    ],
    isDelivered:{type:Boolean,default:false},
    address:{type:String,required:true},
    city:{type:String,required:true},
    country:{type:String,required:true},
    phone:{type:String,required:true},
    postal_code:{type:String,required:true}
},{timestamps:true})

module.exports = mongoose.model('Order',orderSchema)