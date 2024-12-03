import { NextResponse } from 'next/server';
import dbConnect from '@/db/dbConnect'; 
import Winner from '@/models/winner';


// Define the GET function
export async function GET() {
  try {
    await dbConnect();

    const winners = await Winner.find({});

    // Return winners data as JSON
    return NextResponse.json(winners, { status: 200 });
  } catch (error) {
    console.error('Error fetching winners:', error);
    return NextResponse.json({ message: 'Server error', error }, { status: 500 });
  }
}
