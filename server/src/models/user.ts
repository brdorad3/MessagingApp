import mongoose, { Document} from "mongoose";

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
    }
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
  }
  export default mongoose.model<UserDocument>('User', userSchema);