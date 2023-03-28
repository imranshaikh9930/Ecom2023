// import { Timestamp } from "mongodb";
import mongoose from "mongoose";
const { Schema } = mongoose;

const UserSchema = new Schema({

    Name: {
        type: String,
        trim: true,
        required:true,
        
    },
    email: {
        type: String,
        trim: true,
        unique:true,
        
    },

    Password: {
        type: String,
        required:true,
        
    },
    address:{
        type:String,
        trim:true,
    },
    Role:{
        type:Number,
        default:0
    },
},
{timestamps:true}
);


export default mongoose.model("data",UserSchema);