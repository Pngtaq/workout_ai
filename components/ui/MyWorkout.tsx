import { TWorkout } from "@/types/next-auth";

export default function MyWorkout({ data }: { data: TWorkout }) {
  if (!data) {
    return <div>Please save your workout in Create Workout first.</div>;
  }
  return <div>hello</div>;
}
