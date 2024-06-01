import { Schema } from "express-validator";
import mongoose, { Document, ObjectId} from "mongoose";

const Schema = mongoose.Schema;

const userSchema = new Schema({
    username: {
        type: String,
        
    },
    password: {
        type: String,
        
    },
    confirm: {
        type: String,
        
    },
    about_me:{
        type: String
    },
    contacts: [
        {
            type: Schema.Types.ObjectId,
            ref: "User"
        }
        ]
})

userSchema.virtual("url").get(function(){
    return "/" + this._id;
})

export interface UserDocument extends Document {
    username: string;
    password: string;
    confirm: string;
    about_me: string;
    profile_picture: string;
    contacts: mongoose.Types.ObjectId[];
  }
  export default mongoose.model<UserDocument>('User', userSchema);