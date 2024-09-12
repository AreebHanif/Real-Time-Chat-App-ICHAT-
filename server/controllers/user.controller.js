import User from "../models/user.js"

export const userForSideBar = async (req,res)=>{
    try {
        
        const loggedInUserId = req.user._id 
        const filteredUser = await User.find({_id:{$ne : loggedInUserId}}).select("-password -cpassword")  // ne stand for not equal means all the user except the user id that is logged in
        return res.status(200).json(filteredUser)

    } catch (error) {
        res.status(500).json({msg:"Internal server error"})
    }

}