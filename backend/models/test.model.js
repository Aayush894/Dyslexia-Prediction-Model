import mongoose from "mongoose";
const { Schema } = mongoose;

const testSchema = new Schema(
  {
    text: {
      text: String,
      unique: true,
    },
    user_id: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    image: {
        type: String, 
        required: true,
    },
    audio: {
        type: String,
        required: true,
    }
  },
  {
    timestamps: true,
  }
);

export const Test = mongoose.model("Test", testSchema);
