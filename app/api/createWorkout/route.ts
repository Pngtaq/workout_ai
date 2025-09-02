import { auth } from "@/lib/auth";
import { User } from "@/schemas/User";
import { connectDb } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

// Define interface for user with workout
interface UserWithWorkout {
  workout?: {
    days?: Array<{
      day: string;
      warmup: string[];
      mainWorkout: string[];
      cooldown: string[];
    }>;
    dietTips?: {
      hydration: string;
      meals: string[];
      preWorkout: string[];
      postWorkout: string[];
    };
    overview?: {
      daysPerWeek?: number;
      dietTip?: string;
      duration?: string;
      focus?: string;
    };
  };
}

export async function GET() {
  try {
    const session = await auth();
    if (!session || !session.user?.email) {
      return NextResponse.json({ message: "Not authorized" }, { status: 401 });
    }
    
    await connectDb();
    
    // Use projection to only fetch workout data
    const user = await User.findOne(
      { email: session.user.email },
      { workout: 1, _id: 0 }
    ).lean();
    
    if (!user)
      return NextResponse.json({ message: "User not found" }, { status: 401 });
    
    // Type assertion with proper interface
    const userWithWorkout = user as UserWithWorkout;
    const { workout } = userWithWorkout;
    
    return NextResponse.json({ data: workout }, { status: 200 });
  } catch (error) {
    console.error("GET /api/createWorkout error:", error);
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

    // Use findOneAndUpdate for better performance and atomicity
    const user = await User.findOneAndUpdate(
      { email: session.user.email },
      {
        $set: {
          workout: {
            ...body.workout,
            days: body.workout.days || [],
            dietTips: {
              ...body.workout.dietTips,
            },
            overview: {
              ...body.workout.overview,
            },
          },
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
    console.error("PATCH /api/createWorkout error:", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
