import { NextResponse } from "next/server";
import dbConnect from "@/db/dbConnect"; // Ensure you have a database connection utility
import Department from "@/models/department"; // Import your Department model


export async function GET() {
    try {
      // Connect to the database
      await dbConnect();
  
      // Fetch all departments from the database
      const departments = await Department.find();
  
      // Return the list of departments as JSON
      return NextResponse.json(departments, { status: 200 });
    } catch (error: any) {
      // Handle errors
      console.error("Error fetching departments:", error);
      return NextResponse.json(
        { message: "Server error", error: error.message },
        { status: 500 }
      );
    }
  }

  
  export async function POST(req: Request) {
    try {
      // Connect to the database
      await dbConnect();
  
      // Parse the request body (expecting an array of department objects with name and imgpath)
      const departments: { name: string; imgpath: string }[] = await req.json();
  
      // Validate the input array
      if (!Array.isArray(departments) || departments.length === 0) {
        return NextResponse.json(
          { message: "Invalid input, expected an array of department objects." },
          { status: 400 }
        );
      }
  
      // Loop through department objects and insert them into the database
      for (const { name, imgpath } of departments) {
        // Validate each department object
        if (!name || !imgpath) {
          return NextResponse.json(
            { message: "Both name and imgpath are required for each department." },
            { status: 400 }
          );
        }
  
        // Check if the department already exists in the database
        const existingDepartment = await Department.findOne({ name });
  
        if (existingDepartment) {
          return NextResponse.json(
            { message: `Department "${name}" already exists.` },
            { status: 409 }
          );
        }
  
        // Create a new department and save it
        const newDepartment = new Department({ name, imgpath });
        await newDepartment.save();
      }
  
      // Return success response
      return NextResponse.json(
        { message: "Departments added successfully" },
        { status: 201 }
      );
    } catch (error: any) {
      // Handle errors
      console.error("Error adding departments:", error);
      return NextResponse.json(
        { message: "Server error", error: error.message },
        { status: 500 }
      );
    }
  }

// export async function POST(req: Request) {
//   try {
//     // Connect to the database
//     await dbConnect();

//     // Parse the request body
//     const body = await req.json();
//     const { name, totalscore } = body;

//     // Validate department name
//     if (!name) {
//       return NextResponse.json(
//         { message: "Department name is required" },
//         { status: 400 }
//       );
//     }

//     // Check if the department already exists
//     const existingDepartment = await Department.findOne({ name });
//     if (existingDepartment) {
//       return NextResponse.json(
//         { message: "Department name must be unique" },
//         { status: 409 }
//       );
//     }

//     // Create a new department
//     const department = new Department({
//       name,
//       totalscore: totalscore || 0, // Default totalscore to 0 if not provided
//     });

//     // Save the department to the database
//     await department.save();

//     // Respond with success message
//     return NextResponse.json(
//       { message: "Department added successfully", department },
//       { status: 201 }
//     );
//   } catch (error: any) {
//     console.error("Error adding department:", error);
//     return NextResponse.json(
//       { message: "Server error", error },
//       { status: 500 }
//     );
//   }
// }


