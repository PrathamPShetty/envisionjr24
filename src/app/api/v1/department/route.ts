import { NextResponse } from "next/server";
import dbConnect from "@/db/dbConnect"; // Ensure you have a database connection utility
import Department from "@/models/department"; // Import your Department model
import Winner  from "@/models/winner"; // Import your Department model





export async function GET() {
  try {
    // Connect to the database
    await dbConnect();

    // Fetch all departments and winners
    const departments = await Department.find();
    const winners = await Winner.find();

    // Initialize a Map to store department points, starting with 0 points for all departments
    const departmentPoints = new Map();
    
    // Initialize points to 0 for all departments
    for (const department of departments) {
      departmentPoints.set(department.name, 0);
    }

    // Calculate points for each department based on winners
    for (const winner of winners) {
      const departmentName = winner.department;
      const place = winner.place.toLowerCase();

      // Determine points for the place
      const points = place === 'first' ? 5 : 3;

      // Add points to the department
      if (departmentPoints.has(departmentName)) {
        departmentPoints.set(departmentName, departmentPoints.get(departmentName) + points);
      }
    }

    // Update departments with the calculated points
    for (const [departmentName, points] of departmentPoints.entries()) {
      const department = await Department.findOne({ name: departmentName });
      if (department) {
        department.point = points;
        await department.save();
      }
    }
    

    const updatedDepartments = await Department.find();
    console.log(updatedDepartments);
    return NextResponse.json(updatedDepartments, { status: 200 });
  } catch (error: any) {
    // Handle errors
    console.error("Error calculating points:", error);
    return NextResponse.json(
      { message: "Server error", error: error.message },
      { status: 500 }
    );
  }
}


// export async function GET() {
//   try {
 
//     await dbConnect();


//     const departments = await Department.find();
//     const winners = await Winner.find();

//     const departmentPoints = new Map();

  
//     for (const winner of winners) {
//       const departmentName = winner.department;
//       const place = winner.place.toLowerCase();

//       // Determine points for the place
//       const points = place === 'first' ? 5 : 3;

//       // Add points to the department
//       if (departmentPoints.has(departmentName)) {
//         departmentPoints.set(departmentName, departmentPoints.get(departmentName) + points);
//       } else {
//         departmentPoints.set(departmentName, points);
//       }
//     }

//     // Update departments with the calculated points
//     for (const [departmentName, points] of departmentPoints.entries()) {
//       const department = await Department.findOne({ name: departmentName });
//       if (department) {
//         department.point = points;
//         await department.save();
//       }
//     }

 
//     const updatedDepartments = await Department.find();
//     return NextResponse.json(updatedDepartments, { status: 200 });
//   } catch (error: any) {
//     // Handle errors
//     console.error("Error calculating points:", error);
//     return NextResponse.json(
//       { message: "Server error", error: error.message },
//       { status: 500 }
//     );
//   }
// }

// export async function GET() {
//   try {
//     // Connect to the database
//     await dbConnect();

//     // Fetch all departments and winners
//     const departments = await Department.find();
//     const winners = await Winner.find();

//     // Create a map to store updated points for each department
//     const departmentPoints = new Map();

//     // Loop through winners to calculate points
//     for (const winner of winners) {
//       const departmentName = winner.department;
//       const place = winner.place.toLowerCase();

//       // Determine points for the place
//       const points = place === 'first' ? 5 : 3;

//       // Add points to the department
//       if (departmentPoints.has(departmentName)) {
//         departmentPoints.set(departmentName, departmentPoints.get(departmentName) + points);
//       } else {
//         departmentPoints.set(departmentName, points);
//       }
//     }

//     // Update departments with the calculated points
//     for (const [departmentName, points] of departmentPoints.entries()) {
//       const department = await Department.findOne({ name: departmentName });
//       if (department) {
//         department.point = points;
//         await department.save();
//       }
//     }

 
//     const updatedDepartments = await Department.find();
//     return NextResponse.json(departmentPoints, { status: 200 });
//   } catch (error: any) {
//     // Handle errors
//     console.error("Error calculating points:", error);
//     return NextResponse.json(
//       { message: "Server error", error: error.message },
//       { status: 500 }
//     );
//   }
// }

  
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



