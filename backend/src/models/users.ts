import mongoose from "mongoose";
import { ROLE } from "../utility/constants";
import uniqueValidator from "mongoose-unique-validator";

const users = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String },
    role: { type: Number, enum: [Object.values(ROLE)] },
    status: { type: Number, default: 0 },
    mobile_no: { type: String, unique: true },
    country_code: { type: String },
    rating: { type: Number },
  },
  { timestamps: true }
);

users.plugin(uniqueValidator, {
  name: "Unique Validation Error",
  message: " Unique {PATH} required",
});

export default mongoose.model("users", users);
