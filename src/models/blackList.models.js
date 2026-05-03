import mongoose from "mongoose"

const blacklistSchema = new mongoose.Schema({
    token:{
        type:String,
        require:[true, "token is Required to add in blacklist"]
    }
},
{timestamps:true}
)


const Blacklist  = mongoose.model('Blacklist',blacklistSchema)
export default Blacklist