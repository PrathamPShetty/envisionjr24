import dbConnect from "@/db/dbConnect";
import College from "@/models/college";
import {NextRequest, NextResponse} from "next/server";



export async function DELETE(request: NextRequest) {
    try {
        await dbConnect(); // Connect to the database
       // Get the college ID from the URL parameters
        const data = request.nextUrl.pathname;
        const id = data.slice(data.lastIndexOf('/') + 1);
        // const id =' request.nextUrl.query.id as string'; // Get the college ID from the URL parameters

        // Find and delete the college by ID
        const deletedCollege = await College.findByIdAndDelete(id);

        // If the college wasn't found, return a 404 error
        if (!deletedCollege) {
            return NextResponse.json(
                {message: `College with ID "${id}" not found.`},
                {status: 404} // Not found status
            );
        }

        return NextResponse.json(
            {message: `College with ID "${id}" deleted successfully.`},
            {status: 200} // Return success status
        );
    } catch (error: any) {
        console.error("Error deleting college:", error);
        return NextResponse.json(
            {message: "Server error", error: error.message},
            {status: 500} // Return a server error status if there's an issue
        );
    }
}

export async function PUT(request: NextRequest) {
    try {
        await dbConnect(); // Connect to the database
        console.log("Database connected successfully.");

        const data = request.nextUrl.pathname;
        const id = data.slice(data.lastIndexOf("/") + 1);

        console.log("ID to update:", id);

        // Parse the request body
        const { points }: { points: number } = await request.json();

        // Validate points
        if (points === undefined || points === null) {
            return NextResponse.json(
                { message: "Points are required to update the college." },
                { status: 400 }
            );
        }

        console.log("Points to update:", points);

        // Update the college
        const updatedCollege = await College.findByIdAndUpdate(
            id,
            { point:points },
            { new: true } // Ensure the updated document is returned
        );

        if (!updatedCollege) {
            return NextResponse.json(
                { message: `College with ID "${id}" not found.` },
                { status: 404 }
            );
        }

        console.log("Updated College:", updatedCollege);

        return NextResponse.json(
            { message: `College updated successfully.`, updatedCollege },
            { status: 200 }
        );
    } catch (error: any) {
        console.error("Error updating college:", error);
        return NextResponse.json(
            { message: "Server error", error: error.message },
            { status: 500 }
        );
    }
}
