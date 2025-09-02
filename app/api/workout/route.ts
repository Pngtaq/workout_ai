import { auth } from "@/lib/auth";
import { User } from "@/schemas/User";
import { connectDb } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
  try {
    const session = await auth();
    if (!session)
      return NextResponse.json({ message: "Not authorized" }, { status: 401 });
    
    await connectDb();
    
    // Only fetch workout data for better performance
    const user = await User.findOne(
      { email: session.user.email },
      { workout: 1, _id: 0 }
    ).lean();
    
    if (!user || !user.workout) {
      return NextResponse.json({ data: null }, { status: 200 });
    }
    
    return NextResponse.json({ data: user.workout }, { status: 200 });
  } catch (error) {
    console.error("GET /api/workout error:", error);
    return NextResponse.json({ message: "Internal server error" }, { status: 500 });
  }
}

export async function PATCH(req: NextRequest) {
  try {
    await connectDb();

    const session = await auth();
    if (!session?.user?.email) {
      return NextResponse.json({ message: "Not authorized" }, { status: 401 });
    }

    const body = await req.json();

    // Optimized update with only workout data
    const user = await User.findOneAndUpdate(
      { email: session.user.email },
      {
        $set: {
          workout: body.workout,
          updatedAt: Date.now(),
        },
      },
      { 
        new: true,
        projection: { workout: 1, _id: 0 }
      }
    );
    
    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    return NextResponse.json(
      { message: "Workout saved successfully", workout: user.workout },
      { status: 200 }
    );
  } catch (err) {
    console.error("PATCH /api/workout error:", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
