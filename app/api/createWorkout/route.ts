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
