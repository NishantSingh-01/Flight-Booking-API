import mongoose from "mongoose"

const messageSchema = new mongoose.Schema({
    senderId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },

    receiverId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },

    message: {
        type: String,
        trim: true,
        maxlength: 1000
    },

    messageType: {
        type: String,
        enum: ["text", "image", "file"],
        default: "text"
    }
}, {
    timestamps: true
})

export default mongoose.model("Message", messageSchema)