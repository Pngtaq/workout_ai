export type TCreateWorkoutProps = {
  days: string;
  difficulty: string;
  diet: string;
  prompt: string;
};

export interface TWorkout {
  days?: {
    cooldown: string[];
    day: string;
    mainWorkout: string[];
    warmup: string[];
  }[];
  dietTips?: {
    hydration: string;
    meals: string[];
    postWorkout: string[];
    preWorkout: string[];
  };
  overview?: {
    daysPerWeek: number;
    dietTip: string;
    duration: string;
    focus: string;
  };
}

export interface TUserProfileFormData {
  firstName: string;
  lastName: string;
  email: string;
  weight?: number;
  bmi?: number;
  bmiEquivalent?: string;
  heightInFeet?: number;
  heightInInches?: number;
  age?: number;
  gender?: string;
  image?: string;
  workout: Workout;
  days?: string;
  difficulty?: string;
  diet?: string;
  workout: TWorkout;
}
