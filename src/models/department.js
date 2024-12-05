import mongoose from "mongoose";

const DepartmentSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Department name is required"],
      unique: true,
    },
    point: {
      type: Number,
      default: 0,
      validate: {
        validator: (value) => value >= 0,
        message: "Total score cannot be negative",
      },
    },
    event: {
      type: Number,
      default: 0,
      validate: {
        validator: (value) => value >= 0,
        message: "Total score cannot be negative",
      },
    },
    imgpath: {
      type: String,
      required: [true, "Image path is required"], // Corrected the error message here
    }
  },
  { timestamps: true }
);

const Department =
  mongoose.models.Department || mongoose.model("Department", DepartmentSchema);

export default Department;
