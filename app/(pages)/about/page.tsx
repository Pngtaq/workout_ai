import React from "react";

export default function page() {
  const authorName = "John Raison Salvador";

  return (
    <section className="space-y-6" aria-labelledby="about-title">
      <div className="flex flex-col items-start gap-4 rounded-lg border p-4">
        <div className="flex items-center gap-3">
          <div
            className="h-12 w-12 flex-none rounded-full bg-gray-200"
            aria-hidden="true"
          ></div>
          <div>
            <p className="text-sm font-semibold">{authorName}</p>
            <p className="text-xs text-muted-foreground">
              Developer & fitness enthusiast
            </p>
          </div>
        </div>

        <p className="text-sm text-muted-foreground">
          Hi, I’m {authorName}. I built Workout AI to help people skip the
          confusion and start training with plans that actually fit their lives.
          If you have feedback or ideas, I’d love to hear from you.
        </p>

        <div className="mt-2 text-sm">
          <strong>Made with:</strong>
          <ul className="ml-4 list-disc text-muted-foreground">
            <li>AI-generated personalized programming</li>
            <li>Flexible scheduling and equipment options</li>
            <li>Progressive loading & simple progress tracking</li>
          </ul>
        </div>
      </div>

      <header>
        <h2 id="about-title" className="text-2xl font-bold">
          About Workout AI
        </h2>
        <p className="mt-2 text-sm text-muted-foreground max-w-2xl">
          Workout AI is your personal, intelligent fitness planner. Using modern
          AI techniques, it generates customized workout plans based on your
          goals, fitness level, and preferences — so you can train smarter and
          stay consistent.
        </p>
      </header>

      <div className="grid gap-6 md:grid-cols-2">
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">How it works</h3>
          <p className="text-sm text-muted-foreground">
            Provide a few details — like your target (strength, hypertrophy, fat
            loss), available equipment, and weekly schedule — and Workout AI
            will assemble a progressive plan with exercises, sets, reps, and
            sensible progression. Plans adapt to your progress and constraints
            so you can keep moving forward.
          </p>

          <div>
            <h4 className="text-sm font-medium">Mission</h4>
            <p className="text-sm text-muted-foreground">
              Make fitness planning effortless through AI, so anyone can get a
              tailored workout at their fingertips.
            </p>
          </div>

          <div>
            <h4 className="text-sm font-medium">Vision</h4>
            <p className="text-sm text-muted-foreground">
              A world where personalization removes barriers to starting and
              maintaining a fitness habit.
            </p>
          </div>
        </div>
      </div>

      <footer className="text-sm text-muted-foreground">
        <p>
          © {new Date().getFullYear()} {authorName} — Built to make training
          simpler.
        </p>
      </footer>
    </section>
  );
}
