import { User } from "@/schemas/User";

import { NextRequest, NextResponse } from "next/server";

export async function GET() {
  try {
    const session = { user: { email: "raisonsalvador.dev@gmail.com" } };
    if (!session)
      return NextResponse.json({ message: "Not authorized" }, { status: 401 });
    const user = await User.findOne({ email: session.user.email });
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
    // const session = await auth();
    const session = { user: { email: "raisonsalvador.dev@gmail.com" } };
    if (!session)
      return NextResponse.json({ message: "Not authorized" }, { status: 401 });
    const body = await req.json();
    const user = await User.findOne({ email: session.user?.email });
    if (!user)
      return NextResponse.json({ message: "User not found" }, { status: 401 });

    Object.assign(user, body);
    await user.save();
    return NextResponse.json(
      { message: "Workout saved successfully" },
      { status: 200 }
    );
  } catch (err) {
    console.log(err);
    return NextResponse.json({ error: err }, { status: 501 });
  }
}
