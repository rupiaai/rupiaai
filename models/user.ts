import { Schema, models, model, Document } from "mongoose";

export interface User extends Document {
  username: string;
  email: string;
  password: string;
  registerMethod: string;
  googleId?: string;
  image: string;
  createdAt: Date;
  updatedAt: Date;
}

const UserSchema: Schema<User> = new Schema({
  username: {
    type: String,
    required: [true, "Username is required"],
    trim: true,
    unique: true,
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    unique: true,
    match: [/.+\@.+\..+/, "Please use a valid email address"],
  },
  password: {
    type: String,
  },
  registerMethod: {
    type: String,
    enum: ["local", "google"],
    default: "google",
  },
  googleId: {
    type: String,
    unique: true,
  },
  image: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

const userModel = models.User || model<User>("User", UserSchema);
export default userModel;
