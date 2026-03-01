import mongoose from "mongoose";

const dbConnection=async()=>{
   

    try {
         await mongoose.connect(`${process.env.MONGO_URI}/PREPULSE`)
    console.log("Data base connected  Succefully")
    } catch (error) {
        console.log(error)
    }
}

export default  dbConnection 