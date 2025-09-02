"use client";

import CreateWorkOutForm from "@/components/ui/CreateWorkoutForm";
import Image from "next/image";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import Typewriter from "typewriter-effect";
import { TCreateWorkoutProps, TWorkout } from "@/types/next-auth";
import { useSaveWorkout } from "@/hooks/workoutHooks";
import toast, { Toaster } from "react-hot-toast";

// Local storage keys
const STORAGE_KEYS = {
  CURRENT_PROMPT: "workout_current_prompt",
  CURRENT_PLAN: "workout_current_plan",
  CURRENT_DAYS: "workout_current_days",
  CURRENT_DIET_TIPS: "workout_current_diet_tips",
  CURRENT_OVERVIEW: "workout_current_overview",
  IS_SAVED: "workout_is_saved",
};

export default function Page() {
  const [text, setText] = useState<TCreateWorkoutProps>();
  const [plan, setPlan] = useState<TWorkout | undefined>();
  const [days, setDays] = useState<
    { day: string; warmup: string[]; mainWorkout: string[] }[]
  >([]);
  const [dietTips, setDietTips] = useState<{
    hydration: string;
    meals: string[];
    preWorkout: string[];
    postWorkout: string[];
  }>({
    hydration: "",
    meals: [],
    preWorkout: [],
    postWorkout: [],
  });
  type Overview = {
    daysPerWeek?: number;
    dietTip?: string;
    duration?: string;
    focus?: string;
  };
  const [overview, setOverview] = useState<Overview>({});
  
  // Loading state to prevent multiple submissions
  const [isLoading, setIsLoading] = useState(false);
  
  // Track if workout is saved
  const [isSaved, setIsSaved] = useState(false);
  
  // Track if this is a restored workout (to prevent re-animation)
  const [isRestoredFromCache, setIsRestoredFromCache] = useState(false);

  // Load cached data on component mount
  useEffect(() => {
    // Only run on client side
    if (typeof window === 'undefined') return;
    
    try {
      const cachedPrompt = localStorage.getItem(STORAGE_KEYS.CURRENT_PROMPT);
      const cachedPlan = localStorage.getItem(STORAGE_KEYS.CURRENT_PLAN);
      const cachedDays = localStorage.getItem(STORAGE_KEYS.CURRENT_DAYS);
      const cachedDietTips = localStorage.getItem(STORAGE_KEYS.CURRENT_DIET_TIPS);
      const cachedOverview = localStorage.getItem(STORAGE_KEYS.CURRENT_OVERVIEW);
      const cachedIsSaved = localStorage.getItem(STORAGE_KEYS.IS_SAVED);

      if (cachedPrompt) {
        setText(JSON.parse(cachedPrompt));
      }
      if (cachedPlan) {
        setPlan(JSON.parse(cachedPlan));
      }
      if (cachedDays) {
        setDays(JSON.parse(cachedDays));
      }
      if (cachedDietTips) {
        setDietTips(JSON.parse(cachedDietTips));
      }
      if (cachedOverview) {
        setOverview(JSON.parse(cachedOverview));
      }
      if (cachedIsSaved) {
        setIsSaved(JSON.parse(cachedIsSaved));
      }
      
      // If we loaded any cached data, mark as restored
      if (cachedPrompt || cachedPlan || cachedDays || cachedDietTips || cachedOverview) {
        setIsRestoredFromCache(true);
      }
    } catch (error) {
      console.error("Error loading cached data:", error);
      // Clear corrupted cache
      clearCache();
    }
  }, []);

  // Save data to cache whenever it changes
  useEffect(() => {
    // Only run on client side
    if (typeof window === 'undefined') return;
    
    if (text) {
      localStorage.setItem(STORAGE_KEYS.CURRENT_PROMPT, JSON.stringify(text));
    }
  }, [text]);

  useEffect(() => {
    // Only run on client side
    if (typeof window === 'undefined') return;
    
    if (plan) {
      localStorage.setItem(STORAGE_KEYS.CURRENT_PLAN, JSON.stringify(plan));
    }
  }, [plan]);

  useEffect(() => {
    // Only run on client side
    if (typeof window === 'undefined') return;
    
    if (days.length > 0) {
      localStorage.setItem(STORAGE_KEYS.CURRENT_DAYS, JSON.stringify(days));
    }
  }, [days]);

  useEffect(() => {
    // Only run on client side
    if (typeof window === 'undefined') return;
    
    if (dietTips.hydration || dietTips.meals.length > 0 || dietTips.preWorkout.length > 0 || dietTips.postWorkout.length > 0) {
      localStorage.setItem(STORAGE_KEYS.CURRENT_DIET_TIPS, JSON.stringify(dietTips));
    }
  }, [dietTips]);

  useEffect(() => {
    // Only run on client side
    if (typeof window === 'undefined') return;
    
    if (Object.keys(overview).length > 0) {
      localStorage.setItem(STORAGE_KEYS.CURRENT_OVERVIEW, JSON.stringify(overview));
    }
  }, [overview]);

  useEffect(() => {
    // Only run on client side
    if (typeof window === 'undefined') return;
    
    localStorage.setItem(STORAGE_KEYS.IS_SAVED, JSON.stringify(isSaved));
  }, [isSaved]);

  // Function to clear cache
  const clearCache = () => {
    // Only run on client side
    if (typeof window === 'undefined') return;
    
    Object.values(STORAGE_KEYS).forEach(key => {
      localStorage.removeItem(key);
    });
  };

  // Function to clear current workout data (for new prompts)
  const clearCurrentWorkout = () => {
    setText(undefined);
    setPlan(undefined);
    setDays([]);
    setDietTips({
      hydration: "",
      meals: [],
      preWorkout: [],
      postWorkout: [],
    });
    setOverview({});
    setIsSaved(false);
    setIsRestoredFromCache(false); // Reset restored flag for new workouts
    clearCache(); // Only clear cache when starting fresh
  };

  const summary = `
<strong>Overview</strong> \n
<strong>Days per week: </strong>> ${overview.daysPerWeek}
<strong>Diet Tip: </strong>> ${overview.dietTip}
<strong>Duration: </strong>> ${overview.duration}
<strong>Focus: </strong>> ${overview.focus}
${days
  .map(
    (day) => `
${day.day}
<strong>Warm up:\n</strong>${day.warmup.join("\n") + "\n"}
<strong>Main Workout: \n</strong>${day.mainWorkout.join("\n")}
`
  )
  .join("\n")}

<strong>Hydration: </strong>${dietTips.hydration} \n
<strong>Meals: </strong>\n${dietTips.meals.join("\n") + "\n"}
<strong>Pre-Workout Meal:\n</strong>${dietTips.preWorkout.join("\n") + "\n"}
<strong>Post-Workout Meal:\n</strong>${dietTips.postWorkout.join(" ")}
`;

  const { register, handleSubmit } = useForm<TCreateWorkoutProps>();

  const cohereAI = async (payload: object) => {
    setIsLoading(true);
    try {
      const res = await fetch("/api/cohereAI", {
        method: "POST",
        body: JSON.stringify(payload),
        headers: {
          "Content-Type": "application/json",
        },
      });
      
      if (!res.ok) {
        throw new Error(`API request failed: ${res.status}`);
      }
      
      const result = await res.json();
      
      // Debug: Log the response structure
      console.log("Cohere API response:", result);
      
      // Handle different possible response structures
      let responseText = "";
      
      if (result.text) {
        // Direct text response
        responseText = result.text;
      } else if (result.message && result.message.content && result.message.content[0] && result.message.content[0].text) {
        // Nested message structure
        responseText = result.message.content[0].text;
      } else if (result.choices && result.choices[0] && result.choices[0].message && result.choices[0].message.content) {
        // OpenAI-style structure
        responseText = result.choices[0].message.content;
      } else {
        console.error("Unexpected response structure:", result);
        throw new Error("Unexpected response structure from Cohere API");
      }
      
      // Parse the JSON response
      let parsed;
      try {
        parsed = JSON.parse(responseText);
      } catch (parseError) {
        console.error("JSON parsing error:", parseError);
        console.error("Raw response text:", responseText);
        throw new Error("Failed to parse workout plan response");
      }

      // Validate the parsed data structure
      if (!parsed.overview || !parsed.days || !parsed.dietTips) {
        console.error("Invalid workout plan structure:", parsed);
        throw new Error("Invalid workout plan structure received");
      }

      setPlan(parsed);
      setDays(parsed.days);
      setDietTips(parsed.dietTips);
      setOverview(parsed.overview);
      
      // Reset saved state when new workout is generated
      setIsSaved(false);
      
      // Show toast for new workout generation
      toast.success("New workout plan generated!");
    } catch (error) {
      console.error("Error generating workout:", error);
      const errorMessage = error instanceof Error ? error.message : "Unknown error occurred";
      toast.error(`Error generating workout: ${errorMessage}`);
    } finally {
      setIsLoading(false);
    }
  };

  const submitForm = handleSubmit((data) => {
    if (isLoading) return; // Prevent submission if already loading
    
    // Show toast for resetting prompt
    if (text && plan) {
      toast.success("Previous workout cleared. Generating new workout...");
    }
    
    // Clear previous data and cache when new prompt is submitted
    clearCurrentWorkout();
    
    // Set new data
    setText(data);

    const payload = {
      text: `Equipments & Prompt: ${data.prompt}\nDay/s: ${data.days}\nDifficulty: ${data.difficulty}\nDiet: ${data.diet}`,
    };

    cohereAI(payload);
  });

  const saveWorkout = useSaveWorkout();
  const submitWorkout = () => {
    if (plan) {
      saveWorkout.mutate(plan, {
        onSuccess: () => {
          setIsSaved(true);
          toast.success("Workout saved successfully!");
          // Don't clear cache after save - keep the data for navigation
        },
        onError: () => {
          toast.error("Failed to save workout. Please try again.");
        }
      });
    } else {
      toast.error("No workout plan to save.");
    }
  };

  return (
    <div className="flex flex-col h-screen w-full bg-white">
      {/* Toast notifications */}
      <Toaster 
        position="top-right"
        toastOptions={{
          duration: 3000,
          style: {
            background: '#363636',
            color: '#fff',
          },
          success: {
            duration: 3000,
            iconTheme: {
              primary: '#4ade80',
              secondary: '#fff',
            },
          },
          error: {
            duration: 4000,
            iconTheme: {
              primary: '#ef4444',
              secondary: '#fff',
            },
          },
        }}
      />
      
      {/* Header */}
      <header className="p-3  flex items-center justify-between">
        <h1 className="text-sm font-light bg-violet-600 text-white px-3 py-1 rounded-md">
          Create Workout
        </h1>
      </header>

      {/* Chat Area */}
      <main
        className="flex-1 overflow-y-auto px-4 md:px-8 py-6 flex flex-col gap-4 max-w-5xl w-full self-center bg-gray-50 rounded-lg"
        style={{
          scrollbarWidth: "none",
          msOverflowStyle: "none",
        }}
      >
        {/* System intro message */}
        <div className="bg-gray-200 rounded-2xl px-4 py-2 text-center w-fit self-start">
          Let&apos;s build your workout!
        </div>

        {/* Current user summary bubble */}
        {text && (
          <div className="bg-violet-500 text-white rounded-2xl px-4 py-3 max-w-[80%] self-end">
            <h3 className="font-semibold mb-1">Workout Summary</h3>
            <p>
              <span className="font-bold">Equipments & Prompt: </span>
              {text?.prompt}
            </p>
            <p>
              <span className="font-bold">Days: </span>
              {text?.days}
            </p>
            <p>
              <span className="font-bold">Difficulty: </span>
              {text?.difficulty}
            </p>
            <p>
              <span className="font-bold">Diet: </span>
              {text?.diet}
            </p>
          </div>
        )}

        {/* Loading indicator */}
        {isLoading && (
          <div className="bg-gray-200 rounded-2xl px-4 py-3 w-[80%] self-start text-sm">
            <div className="flex items-center gap-2">
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-violet-600"></div>
              <span>Generating your workout plan...</span>
            </div>
          </div>
        )}

        {/* Current AI Response bubble */}
        {days && overview && plan && !isLoading && (
          <div className="bg-gray-200 rounded-2xl px-4 py-3 w-[80%] self-start text-sm space-y-3">
            <pre className="whitespace-pre-wrap text-sm">
              {isRestoredFromCache ? (
                // Show text immediately without animation for restored workouts
                <div dangerouslySetInnerHTML={{ __html: summary }} />
              ) : (
                // Show animation for new workouts
                <Typewriter
                  options={{ delay: 0.5 }}
                  onInit={(typewriter) => {
                    typewriter.typeString(summary).start();
                  }}
                />
              )}
            </pre>
            {!isSaved && (
              <button
                className="rounded-md hover:bg-gray-300 px-2 py-1 flex items-center gap-2 text-xs bg-gray-300 "
                onClick={submitWorkout}
              >
                <Image
                  width={20}
                  height={20}
                  src="/icons/copy-dark.png"
                  alt="copy"
                />
                Save
              </button>
            )}
            {isSaved && (
              <div className="text-xs text-green-600 font-medium flex items-center gap-2">
                <Image
                  width={16}
                  height={16}
                  src="/icons/copy-dark.png"
                  alt="saved"
                />
                Workout Saved ✓
              </div>
            )}
          </div>
        )}
      </main>

      {/* Fixed Input */}
      <footer className="py-4 px-2 bg-white shadow-gray-600 shadow-2xl">
        <div className="max-w-3xl w-full mx-auto">
          <CreateWorkOutForm 
            submitForm={submitForm} 
            register={register} 
            isLoading={isLoading}
          />
        </div>
      </footer>
    </div>
  );
}
