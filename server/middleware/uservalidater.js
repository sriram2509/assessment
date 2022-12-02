const { StatusCodes } = require("http-status-codes");
const User = require("../model/user");
const { APIError } = require("./errorhandler");

const isAdmin = async (req, res, next) => {
    const { JWT_DATA: { userID, role }} = req
    const user = await User.findById({ _id: userID }).exec();
    if (!(user && ["admin"].includes(role)))
        throw new APIError("Not allowed", StatusCodes.FORBIDDEN)
    next()
}



const isUser = async (req, res, next) => {
    const { JWT_DATA: { userID, role } } = req
    const user = await User.findById({ _id: userID }).exec();
    if (!(user && ["user"].includes(role)))
        throw new APIError("Not allowed", StatusCodes.FORBIDDEN)
    next()

}


const isAdminOrUser = async (req, res, next) => {
    const { JWT_DATA: { userID, role }} = req
    const user = await User.findById({ _id: userID }).exec();
    if (!(user && ["admin","user"].includes(role)))
        throw new APIError("Not allowed", StatusCodes.FORBIDDEN)
    next()
}




module.exports = {
    isAdmin,
    isUser,
    isAdminOrUser,
   
}