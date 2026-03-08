import mongoose from "mongoose";

const internshipSchema = new mongoose.Schema(
  {
    studentName: {
      type: String,
      required: true
    },
    studentEmail: {
      type: String,
      required: true
    },
    companyName: {
      type: String,
      required: true
    },
    internshipRole: {
      type: String,
      required: true
    },
    internshipType: {
      type: String,
      enum: ["Paid", "Unpaid"],
      required: true
    },
    startDate: {
      type: Date,
      required: true
    },
    endDate: {
      type: Date,
      required: true
    },
    mentorName: {
      type: String,
      required: true
    },
    isPaid: {
      type: Boolean,
      default: false
    }
  },
  { timestamps: true }
);

export default mongoose.model("Internship", internshipSchema);
