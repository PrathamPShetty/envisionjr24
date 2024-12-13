import { NextResponse } from 'next/server';
import dbConnect from '@/db/dbConnect'; 
import College from '@/models/college';



export async function GET() {
  try {
    await dbConnect();

   
    const winners = await College.find({}).sort({ point: -1 }); 

    return NextResponse.json(winners, { status: 200 });
  } catch (error) {
    console.error('Error fetching college:', error);
    return NextResponse.json({ message: 'Server error', error }, { status: 500 });
  }
}