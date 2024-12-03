import { NextResponse } from 'next/server';
import dbConnect from '@/db/dbConnect';
import User from '@/models/user';
import Winner from '@/models/winner';
// import Department from '@/models/department';

interface RequestBody {
  username: string;
  name: string;
  department: string;
  semester: string;
  event: string;
  place: string;
}


export async function POST(req: Request): Promise<NextResponse> {
  try {
    await dbConnect();

    const body: RequestBody = await req.json();
    console.log('Received request body:', body); // Log the request body

    const { username, name, department, semester, event, place } = body;

    // Validate required fields
    if (!username || !name || !department || !semester || !event || !place) {
      console.error('Missing fields:', { username, name, department, semester, event, place });
      return NextResponse.json({ message: 'All fields are required' }, { status: 400 });
    }

    // Check if department is a valid ObjectId
  

    // Check if the user exists
    const user = await User.findOne({ username });
    if (!user) {
      console.error('User not found:', username);
      return NextResponse.json({ message: 'User not found' }, { status: 404 });
    }

    // const findDepartment = await Department.findOne({ name: department });
    // if (!findDepartment) {
    //   console.error('Department not found:', department);
    //   return NextResponse.json({ message: 'Department not found' }, { status: 404 });
    // }

    // // Update department points
    // if (place.toLowerCase() === 'first') {
    //   findDepartment.point += 5;
    // } else {
    //   findDepartment.point += 3;
    // }
    // await findDepartment.save();

    // Create a new winner entry
    const newWinner = new Winner({
      name,
      department,
      semester,
      event,
      place,
      username: user._id,
    });

    await newWinner.save();
   

    return NextResponse.json({ message: 'Winner added successfully', winner: newWinner }, { status: 201 });
  } catch (error) {
    console.error('Error processing request:', error);
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
}
