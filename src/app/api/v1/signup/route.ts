import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '@/models/user';
import dbConnect from '@/db/dbConnect';
import { NextResponse } from 'next/server';
import dotenv from 'dotenv';

dotenv.config();

const JWT_SECRET: string = process.env.JWT_SECRET || 'your_secret_key';

// Define the structure of the request body
interface SignupRequestBody {
  username: string;
  password: string;
}

export async function POST(req: Request): Promise<NextResponse> {
  try {
    // Parse the JSON body from the request
    const body: SignupRequestBody = await req.json();
    const { username, password } = body;

    // Validate input
    if (!username || !password) {
      return NextResponse.json(
        { message: 'Username and password are required.' },
        { status: 400 }
      );
    }

    // Connect to the database
    await dbConnect();

    // Check if the user already exists
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return NextResponse.json(
        { message: 'User already exists.' },
        { status: 400 }
      );
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user document
    const newUser = new User({
      username,
      password: hashedPassword,
    });

    // Save the new user to the database
    await newUser.save();

    // Generate JWT tokens
    const accessToken = jwt.sign(
      { userId: newUser._id, username: newUser.username },
      JWT_SECRET,
      { expiresIn: '15m' }
    );

    const refreshToken = jwt.sign(
      { userId: newUser._id, username: newUser.username },
      JWT_SECRET,
      { expiresIn: '7d' }
    );

    // Save the refresh token in the user document
    newUser.refreshTokens = refreshToken;
    await newUser.save();

    // Respond with a success message and tokens
    return NextResponse.json(
      {
        message: 'User registered successfully.',
        accessToken,
        refreshToken,
        username: newUser.username,
      },
      { status: 201 }
    );
  } catch (error: any) {
    console.error(`Error during signup: ${error.message}`);
    return NextResponse.json(
      { message: 'Server error.', error: error.message },
      { status: 500 }
    );
  }
}
