import mongoose, { Document} from "mongoose";

const Schema = mongoose.Schema;

const userSchema = new Schema({
    username: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true
    },
    confirm: {
        type: String,
        required: true
    }
})

export interface UserDocument extends Document {
    username: string;
    password: string;
    confirm: string;
  }
  export default mongoose.model<UserDocument>('User', userSchema);