const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const productSchema = new Schema({
    title:{
        type:String,
        required:true
    },
    image:{
        type:String,
        required:true
    },
    price:{
        type:Number,
        required:true
    },
    reviews:[
        {
            userId:{type:mongoose.Types.ObjectId,required:true,ref:"User"},
            rate:{type:Number,required:true},
        }
    ],
    categoryId:{type:mongoose.Types.ObjectId,required:true,ref:"Category"},
    colors:{type:Array,required:true},
    sizes:{type:Array,required:true},
    userFavourites:[
        {
            userId:{type:mongoose.Types.ObjectId,required:true,ref:"User"},
        }
    ],
    reviews:[
        {
            userName:{type:String,required:true},
            rating:{type:Number,required:true},
            comment:{type:String,required:true},
            date:{type:Date,required:true},
            userId:{type:mongoose.Types.ObjectId,required:true}
        }
    ]
},{timestamps:true})

module.exports = mongoose.model('Product',productSchema)