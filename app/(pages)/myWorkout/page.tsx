import MyWorkout from "@/components/ui/MyWorkout";
import { getWorkout } from "@/services/helper";

const Page = async () => {
  const data = await getWorkout();

  return <MyWorkout data={data} />;
};

export default Page;
