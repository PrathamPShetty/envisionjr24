import mongoose from "mongoose";

const CollegeSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "college name is required"],
      unique: true,
    },
    point: {
      type: Number,
      default: 0,
     
    },
    event: {
      type: Number,
      default: 0,
      validate: {
        validator: (value) => value >= 0,
        message: "Total score cannot be negative",
      },
    },
    // imgpath: {
    //   type: String,
    //   required: [true, "Image path is required"], // Corrected the error message here
    // }
  },
  { timestamps: true }
);

const College =
  mongoose.models.college || mongoose.model("college", CollegeSchema);

export default College;
