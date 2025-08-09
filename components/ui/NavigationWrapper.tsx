import Navigation from "./Navigation";
import { getUserInfo } from "@/services/user";

export default async function NavigationWrapper() {
  const session = await getUserInfo();

  console.log(session);
  return <Navigation session={session} />;
}
