import mongoose from "mongoose";
const { Schema } = mongoose;

const testRecordSchema = new Schema(
  {
    text: {
      text: String,
      unique: true,
    },
    test_id: {
      type: Schema.Types.ObjectId,
      ref: 'Test',
      required: true,
    },
    test_score: {
        type: String, 
        required: true,
    },
    prediction: {
        type: String,
        required: true,
    }
  },
  {
    timestamps: true,
  }
);

export const TestRecord = mongoose.model("TestRecord", testRecordSchema);
