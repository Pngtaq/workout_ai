import { CohereClientV2 } from "cohere-ai";
import { NextRequest, NextResponse } from "next/server";

const cohere = new CohereClientV2({ token: process.env.COHERE_API_KEY });

export async function POST(req: NextRequest) {
  const { text } = await req.json();

  const response = await cohere.chat({
    model: "command-a-03-2025",
    messages: [
      {
        role: "system",
        content:
          "Only respond if the user's prompt is related to workouts. If it's not, politely indicate that you're only able to assist with workout-related topics and disregard the request.",
      },
      {
        role: "user",
        content: `Return only a raw valid JSON object. Do not wrap in triple backticks or explain anything. Just the object. Based on the following input — equipment, addional prompt, workout days, difficulty, and diet — generate a workout plan. If the prompt is not about workouts or lacks necessary input, return a default plan.

Input: ${text}

Return structure:
{
  "overview": {
    "daysPerWeek": number,
    "duration": string,
    "focus": string,
    "dietTip": string
  },
  "days": [
    {
      "day": string,
      "warmup": string[],
      "mainWorkout": string[],
      "cooldown": string[]
    }
  ],
  "dietTips": {
    "preWorkout": string[],
    "postWorkout": string[],
    "meals": string[],
    "hydration": string
  }
}`,
      },
    ],
  });

  return NextResponse.json(response);
}
