const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = mongoose.Schema(
  {
    email: {
      type: String,
      required: [true, "Please provide email"],
      unique: true,
    },
    role: {
      type: String,
      enum: {
        values: ["admin", "user"],
        message: "Invalid user role, Please select user",
      },
      required: [true, "Please provide role"],
    },
    password: {
      type: String,
      required: [true, "Please provide password"],
    },
    deleted: {
      type: Boolean,
      default: false,
    }
  },
  {
    timestamps: false,
  }
);


userSchema.pre("save", function (next) {
  if (!this.isModified("password")) return next();
  const salt = bcrypt.genSaltSync(10);
  const hashedPassword = bcrypt.hashSync(this.password, salt);
  this.password = hashedPassword;
  return next();
});

userSchema.pre('findOneAndUpdate', async function () {
  if (this._update.password) {
    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(this._update.password, salt);
    this._update.password = hashedPassword;
  }
})

const userModel = mongoose.model("user", userSchema);

(async () => {
  const data = await userModel.find({}).exec();
  if (data.length !== 0) return;

  const admin1 = new userModel({
    email: "mnrazamohamed@gmail.com",
    role: "admin",
    password: "findCITY@123",
  });
  await admin1.save();

  const admin2 = new userModel({
    email: "ubirunthan77@gmail.com",
    role: "admin",
    password: "findCITY@077",
  });
  await admin2.save();
})();

module.exports = userModel;
