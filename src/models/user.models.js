import mongoose from "mongoose"


const userschema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,

    },
    password: {
        type: String,
        required: true
    },
    emailVerified: {
        type: Boolean,
        default: false
    },
    phone: {
        countryCode: {
            type: String,
            default: "+91"
        },

        number: {
            type: Number,
        }
    },
    phoneVerified: {
        type: Boolean,
        default: false
    },
    role: {
        type: String,
        enum: ["USER", 'ADMIN', 'AGENT'],
        default: "USER"
    },

},
    { timestamps: true }
)


const User = mongoose.model('User', userschema)
export default User
