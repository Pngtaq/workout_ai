import { NextRequest, NextResponse } from "next/server";
import { connectDb } from "@/lib/db";
import { User } from "@/schemas/User";
import { auth } from "@/lib/auth";
import { getBMICategory } from "@/services/helper";

export async function GET() {
  try {
    const session = await auth();

    if (!session || !session.user)
      return NextResponse.json({ error: "Session not found" }, { status: 401 });
    
    await connectDb();
    
    // Use projection to only fetch needed fields
    const user = await User.findOne(
      { email: session.user.email },
      { 
        _id: 0, 
        email: 0,
        createdAt: 0,
        __v: 0 
      }
    ).lean();

    if (!user)
      return NextResponse.json({ error: "User not found" }, { status: 401 });

    return NextResponse.json({ data: user }, { status: 200 });
  } catch (error) {
    console.error("GET /api/user error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { firstName, lastName, email, image } = body;

    await connectDb();
    
    // Use findOneAndUpdate with upsert for better performance
    const existingUser = await User.findOne({ email }).lean();

    if (existingUser) {
      return NextResponse.json(
        { message: "Already registered" },
        { status: 200 }
      );
    }

    const newUser = new User({ email, firstName, lastName, image });
    const user = await newUser.save();

    return NextResponse.json({ user }, { status: 201 });
  } catch (err) {
    console.error("POST /api/user error:", err);
    return NextResponse.json(
      { error: "Failed to create user" },
      { status: 500 }
    );
  }
}

export async function PATCH(req: NextRequest) {
  try {
    const session = await auth();
    if (!session || !session?.user?.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    await connectDb();

    const body = await req.json();
    const { heightInFeet, heightInInches, weight } = body;
    
    // Calculate BMI before update
    const bmi = (weight * 703) / (heightInFeet * 12 + heightInInches) ** 2;
    const bmiEquivalent = getBMICategory(bmi);
    
    // Use findOneAndUpdate for better performance and atomicity
    const user = await User.findOneAndUpdate(
      { email: session.user.email },
      {
        ...body,
        bmi: parseFloat(bmi.toFixed(1)),
        bmiEquivalent,
        updatedAt: Date.now(),
      },
      { 
        new: true,
        projection: { _id: 0, email: 0, createdAt: 0, __v: 0 }
      }
    );
    
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    return NextResponse.json({ data: user }, { status: 200 });
  } catch (err) {
    console.error("PATCH /api/user error:", err);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
