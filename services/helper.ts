import { TUserProfileFormData, TWorkout } from "@/types/next-auth";
const bmiCategories = [
  { min: 0, max: 18.4, category: "Underweight" },
  { min: 18.5, max: 24.9, category: "Normal weight" },
  { min: 25.0, max: 29.9, category: "Overweight" },
  { min: 30.0, max: 34.9, category: "Obesity Class I" },
  { min: 35.0, max: 39.9, category: "Obesity Class II" },
  { min: 40.0, max: Infinity, category: "Obesity Class III" },
];
export function getBMICategory(bmi: number) {
  return (
    bmiCategories.find((range) => bmi >= range.min && bmi <= range.max)
      ?.category || "Unknown"
  );
}

export async function updateUserProfile(data: TUserProfileFormData) {
  try {
    const res = await fetch("/api/user", {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!res.ok) {
      throw new Error("Failed to update profile");
    }

    return;
  } catch (err) {
    console.error("PATCH error:", err);
  }
}

export async function saveWorkout(data: TWorkout) {
  try {
    const res = await fetch("/api/createWorkout", {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ workout: data }),
    });

    if (!res.ok) {
      throw new Error("Failed to update profile");
    }

    return;
  } catch (err) {
    console.error("PATCH error:", err);
  }
}

export async function getWorkout() {
  try {
    const res = await fetch("/api/createWorkout", {
      method: "GET",
    });
    if (!res.ok) throw new Error("Failed to fetch workout");
    const data = await res.json();
    return data.workout;
  } catch (error) {
    console.log(error);
  }
}
