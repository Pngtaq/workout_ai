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
    const user = await User.findOne(
      { email: session.user.email },
      { _id: 0, email: 0 }
    ).lean();

    if (!user)
      return NextResponse.json({ error: "User not found" }, { status: 401 });

    return NextResponse.json({ data: user }, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error: error }, { status: 501 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { firstName, lastName, email, image } = body;

    await connectDb();
    const existingUser = await User.findOne({ email });

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
    console.error("Error creating user:", err);
    return NextResponse.json(
      { error: "Failed to create user" },
      { status: 500 }
    );
  }
}

export async function PATCH(req: NextRequest) {
  try {
    const session = await auth();
    console.log(session);
    if (!session || !session?.user?.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    await connectDb();

    const body = await req.json();
    const { heightInFeet, heightInInches, weight } = body;
    const user = await User.findOne({ email: session?.user.email });
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    Object.assign(user, body);
    const bmi = (weight * 703) / (heightInFeet * 12 + heightInInches) ** 2;
    user.bmi = parseFloat(bmi.toFixed(1));
    user.bmiEquivalent = getBMICategory(bmi);
    user.updatedAt = Date.now();
    await user.save();

    return NextResponse.json({ data: user }, { status: 200 });
  } catch (err) {
    console.error("PATCH error:", err);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
