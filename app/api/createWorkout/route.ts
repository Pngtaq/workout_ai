import { auth } from "@/lib/auth";
import { User } from "@/schemas/User";
import { connectDb } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
  try {
    // const session = { user: { email: "raisonsalvador.dev@gmail.com" } };
    const session = await auth();
    if (!session)
      return NextResponse.json({ message: "Not authorized" }, { status: 401 });
    const user = await User.findOne({ email: session?.user?.email });
    if (!user)
      return NextResponse.json({ message: "User not found" }, { status: 401 });

    return NextResponse.json({ workout: user.workout }, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: error }, { status: 501 });
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
    console.log("Incoming body:", body);

    const user = await User.findOne({ email: session.user.email });
    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    // Merge only workout fields
    if (body.workout) {
      user.workout = {
        ...user.workout?.toObject(),
        ...body.workout,
        days: body.workout.days || user.workout?.days,
        dietTips: {
          ...user.workout?.dietTips,
          ...body.workout.dietTips,
        },
        overview: {
          ...user.workout?.overview,
          ...body.workout.overview,
        },
      };
    }

    await user.save();

    return NextResponse.json(
      { message: "Workout saved successfully", workout: user.workout },
      { status: 200 }
    );
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: err }, { status: 500 });
  }
}
