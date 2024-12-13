import { NextResponse } from "next/server";
import dbConnect from "@/db/dbConnect"; // Ensure you have a database connection utility
import College from "@/models/college"; // Import your college model


export async function GET() {
    try {
      await dbConnect();
      const colleges = await College.find().sort({ name: 1 }); 
      return NextResponse.json(colleges, { status: 200 });
    } catch (error: any) {
      console.error("Error fetching colleges:", error);
      return NextResponse.json(
        { message: "Server error", error: error.message },
        { status: 500 }
      );
    }
  }

  export async function POST(req: Request) {
    try {
      await dbConnect();
  

      const { name }: { name: string } = await req.json();
  
  
      if (!name) {
        return NextResponse.json(
          { message: "Name is required for the college." },
          { status: 400 }
        );
      }
  
 
      const existingCollege = await College.findOne({ name });
      if (existingCollege) {
        return NextResponse.json(
          { message: `College "${name}" already exists.` },
          { status: 409 }
        );
      }
  

      const newCollege = new College({ name });
      await newCollege.save();
  
      return NextResponse.json(
        { message: `College "${name}" added successfully.` },
        { status: 201 }
      );
    } catch (error: any) {
      console.error("Error adding college:", error);
      return NextResponse.json(
        { message: "Server error", error: error.message },
        { status: 500 }
      );
    }
  }



  export async function PUT(req: Request, { params }: { params: { id: string } }) {
    try {
      await dbConnect(); // Connect to the database
  
      const { id } = params; // Get the college ID from the URL parameters
      const { points }: { points: number } = await req.json(); // Get the updated points from the request body
  
      // Check if the points are provided
      if (points === undefined || points === null) {
        return NextResponse.json(
          { message: "Points are required to update the college." },
          { status: 400 } // Bad request status if points are missing
        );
      }
  
      // Find the college by ID and update its points
      const updatedCollege = await College.findByIdAndUpdate(
        id,
        { points },
        { new: true } // Return the updated document
      );
  
      // If the college wasn't found, return a 404 error
      if (!updatedCollege) {
        return NextResponse.json(
          { message: `College with ID "${id}" not found.` },
          { status: 404 } // Not found status
        );
      }
  
      return NextResponse.json(
        { message: `College updated successfully.`, updatedCollege },
        { status: 200 } // Return success status with updated college data
      );
    } catch (error: any) {
      console.error("Error updating college:", error);
      return NextResponse.json(
        { message: "Server error", error: error.message },
        { status: 500 } // Return a server error status if there's an issue
      );
    }
  }


  export async function DELETE(req: Request, { params }: { params: { id: string } }) {
    try {
      await dbConnect(); // Connect to the database
  
      const { id } = params; // Get the college ID from the URL parameters
  
      // Find and delete the college by ID
      const deletedCollege = await College.findByIdAndDelete(id);
  
      // If the college wasn't found, return a 404 error
      if (!deletedCollege) {
        return NextResponse.json(
          { message: `College with ID "${id}" not found.` },
          { status: 404 } // Not found status
        );
      }
  
      return NextResponse.json(
        { message: `College with ID "${id}" deleted successfully.` },
        { status: 200 } // Return success status
      );
    } catch (error: any) {
      console.error("Error deleting college:", error);
      return NextResponse.json(
        { message: "Server error", error: error.message },
        { status: 500 } // Return a server error status if there's an issue
      );
    }
  }