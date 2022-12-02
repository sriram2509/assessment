const UserModel = require("../../model/user");
const PostModel = require("../../model/post");
const { APIError } = require("../../middleware/errorhandler");
const { StatusCodes } = require("http-status-codes");
const { v4: uuidv4 } = require("uuid");



//Get users
const getUsers = async (req, res) => {

  let user = undefined
  Object.entries(req.params).length === 0 ?
    user = await UserModel.find({ ...req.query, deleted: false }).sort('_id') :
    user = await UserModel.findOne({ ...req.params, deleted: false }).sort('_id')

  if (user.length === 0)
    return res.status(StatusCodes.OK).json({
      status: StatusCodes.NOT_FOUND,
      data: "No user found",
    });

  res.status(StatusCodes.OK).json({
    status: StatusCodes.OK,
    data: {
      count: user.length,
      user: user,
    }
  });
};


// Delete user
const deleteUser = async (req, res) => {
  const { _id } = req.params;

  if (!_id) throw new APIError("userID required", StatusCodes.NOT_FOUND)
  const user = await UserModel.findById({ _id: _id })
  if (!user) throw new APIError("user not found", StatusCodes.NOT_FOUND)

  await UserModel.findByIdAndUpdate(
    { _id: _id },
    {
      deleted: true,
      email: user.email + "|$|" + uuidv4(),
      nic: user.nic + "|$|" + uuidv4(),
    })

  // delete posts that assoicates with the user
  if (user.role === "user") {
    const posts = await PostModel.find({ userID: _id })
    for (const post of posts) {
      await PostModel.findByIdAndUpdate(
        { _id: post._id }, { deleted: true }
      )
    }
  }

  return res.status(StatusCodes.OK).json({
    status: StatusCodes.OK,
    data: "User deleted successfully.",
  });

};

module.exports = {
  getUsers,
  deleteUser,
};
