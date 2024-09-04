const User = require("../Modules/Auth")

const GetALLUsers = async(req,res)=>{
    try {
        const users = await User.find({}).select("-password")
        if(!users) return res.status(404).json({message: "No users found"})
        res.status(200).json({
            data: users,
            count: users.length
        })
    } catch (error) {
        res.status(500).json({error: error.message})
    }
}

module.exports ={
    GetALLUsers
}