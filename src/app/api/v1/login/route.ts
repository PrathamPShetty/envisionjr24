import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '@/models/user';
import dbConnect from '@/db/dbConnect';
import { NextResponse } from 'next/server';
import dotenv from 'dotenv';

dotenv.config();

const JWT_SECRET: string = process.env.JWT_SECRET || 'your_secret_key';

// Define the structure of the request body
interface LoginRequestBody {
  username: string;
  password: string;
}

// Define the structure of the User document (extend or adjust based on your schema)
interface UserDocument {
  _id: string;
  username: string;
  password: string;
  refreshTokens?: string;
  save: () => Promise<void>;
}

export async function POST(req: Request): Promise<NextResponse> {
  try {
    // Parse the JSON body from the request
    const body: LoginRequestBody = await req.json();
    const { username, password } = body;

    // Validate the request body
    if (!username || !password) {
      return NextResponse.json(
        { message: 'Username and password are required.' },
        { status: 400 }
      );
    }

    // Connect to the database
    await dbConnect();

    // Find the user in the database
    const user: UserDocument | null = await User.findOne({ username });
    if (!user) {
      return NextResponse.json(
        { message: 'User not found.' },
        { status: 404 }
      );
    }

    // Compare the provided password with the hashed password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return NextResponse.json(
        { message: 'Invalid credentials.' },
        { status: 400 }
      );
    }

    // Generate access and refresh tokens
    const accessToken = jwt.sign(
      { userId: user._id, username: user.username },
      JWT_SECRET,
      { expiresIn: '15m' }
    );

    const refreshToken = jwt.sign(
      { userId: user._id, username: user.username },
      JWT_SECRET,
      { expiresIn: '7d' }
    );

    // Save the refresh token in the user's document
    user.refreshTokens = refreshToken;
    await user.save();

    // Respond with success message and tokens
    return NextResponse.json({
      message: 'Login successful.',
      accessToken,
      refreshToken,
      username: user.username,
    });
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error(`Error during login: ${error.message}`);
      return NextResponse.json(
        { message: 'Server error.', error: error.message },
        { status: 500 }
      );
    }
    console.error('Unexpected error:', error);
    return NextResponse.json(
      { message: 'An unexpected error occurred.' },
      { status: 500 }
    );
  }
}
