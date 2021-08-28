import mongoose from "mongoose";

const UserSchema = mongoose.Schema(
  {
    full_name: {
      type: String,
      required: true,
      min: 3,
      max: 50,
    },
    email: {
      type: String,
      unique: true,
      lowercase: true,
      required: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
    }
  },
  { timestamps: true }
);

UserSchema.methods.toJSON = function () {
  const user = this;

  const userObject = user.toObject();

  delete userObject.password;

  return userObject;
};
const User = mongoose.model("User", UserSchema);

export default User;
