import { auth } from "@/lib/auth";
import { connectDb } from "@/lib/db";
import { User } from "@/schemas/User";

type TUserProps = {
  firstName: string;
  lastName: string;
  email: string;
  image: string;
};

export async function createUser({
  firstName,
  lastName,
  email,
  image,
}: TUserProps) {
  await connectDb();
  const user = await User.create({
    firstName: firstName,
    lastName: lastName,
    email: email,
    image: image,
  });
  await user.save();
  return user;
}

export async function getUserInfo() {
  try {
    const session = await auth();
    if (!session || !session.user) throw new Error("Session not found");
    await connectDb();
    const user = await User.findOne({ email: session.user.email }).lean();
    const plainUser = JSON.parse(JSON.stringify(user));

    return plainUser;
  } catch (error) {
    console.log("Get error: ", error);
    return null;
  }
}
