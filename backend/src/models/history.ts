import mongoose from "mongoose";
import { HISTORY_TYPE } from "../utility/constants";

const historys = new mongoose.Schema(
  {
    users_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
      required: true,
    },
    books_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "books",
      required: true,
    },
    time: { type: Number, required: true },
    type: { type: Number, enum: [Object.values(HISTORY_TYPE)] },
  },
  { timestamps: true }
);

export default mongoose.model("historys", historys);
