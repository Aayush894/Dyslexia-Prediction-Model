import mongoose from "mongoose";
const { Schema } = mongoose;

const recordSchema = new Schema(
  {
    username: {
      type: String,
      required: [true, "Username is required"],
      unique: true,
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
    },
    assessmentDate: {
        type: Date,
        default: setDate,
    },
    assessmentScore: {
        type: String, 
        required: true,
    },
    assessmentType: {
        type: String,
        required: true,
    }
  },
  {
    timestamps: true,
  }
);

const setDate = () => {
    const date = new Date().toLocaleDateString() ; 
    return date;
}

export const Record = mongoose.model("Record", recordSchema);
