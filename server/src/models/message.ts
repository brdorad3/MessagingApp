import mongoose from "mongoose";

const Schema = mongoose.Schema;

const messageSchema = new Schema({
    from: {
        type: Schema.Types.ObjectId,
        ref: "User"
    },
    to: {
        type: Schema.Types.ObjectId,
        ref: "User"
    },
    content: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now()
    }

})

export interface MessageDocument extends Document {
    from: mongoose.Types.ObjectId[];
    to: mongoose.Types.ObjectId[];
    content: string;
    date: Date;
    
  
  }
  export default mongoose.model<MessageDocument>('Message', messageSchema);