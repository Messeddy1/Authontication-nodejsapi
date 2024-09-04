const mongoose = require("mongoose");
const conectDb  = async()=>{
    try {
         const conn =  await mongoose.connect(process.env.MGDB)
        console.log(`DB connected successfully,${conn.connection.host}`);
    } catch (error) {
        console.log(error.message);
    }
}

module.exports = conectDb