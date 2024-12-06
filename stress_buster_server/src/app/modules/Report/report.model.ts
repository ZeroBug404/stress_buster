import mongoose from "mongoose";


const reportSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
  },
  score: {
    type: Number,
  },
  keywords: [
    {
      type: String,
    },
  ],
  analysis: {
    type: String,
  },
  timestamp: {
    type: Date,
    default: () => Date.now(),
  },
});

const Report=  mongoose.model("Report", reportSchema);
export default Report