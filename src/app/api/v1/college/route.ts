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

