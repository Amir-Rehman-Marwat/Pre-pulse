import mongoose from "mongoose";
const blackListSchema=mongoose.Schema({
    token:{
        type:String,
        require:true
    }
})
const blackListModel=mongoose.model("blackListedTokens",blackListSchema);
export default blackListModel;