import Image from "next/image";

export default function page() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-4 py-8">
      <div className="w-full max-w-3xl space-y-6">
        {/* Card: Intro */}
        <div className=" shadow-md rounded-xl p-6 border border-gray-100 bg-violet-500 text-white">
          <div className="flex items-center space-x-4">
            <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-white">
              <Image
                width={50}
                height={50}
                src="/me.jpg"
                alt="John Raison Salvador"
                className="w-full h-full object-cover rounded-full"
              />
            </div>
            <div className="text-white">
              <h2 className="text-xl font-semibold">John Raison Salvador</h2>
              <p className="text-sm ">Developer & fitness enthusiast</p>
            </div>
          </div>
          <p className="mt-4 leading-relaxed">
            Hi, I’m John Raison Salvador. I built Workout AI to help people skip
            the confusion and start training with plans that actually fit their
            lives. If you have feedback or ideas, I’d love to hear from you.
          </p>
        </div>

        {/* Card: Made with */}
        <div className="bg-white shadow-md rounded-xl p-6 border border-gray-100 ">
          <h3 className="text-lg font-semibold mb-3">Made with:</h3>
          <ul className="list-disc list-inside text-gray-700 space-y-1">
            <li>AI-generated personalized programming</li>
            <li>Flexible scheduling and equipment options</li>
            <li>Progressive loading & simple progress tracking</li>
          </ul>
        </div>

        {/* Card: About */}
        <div className=" shadow-md rounded-xl p-6 border border-gray-100  bg-violet-500 text-white">
          <h3 className="text-lg font-semibold mb-3">About Workout AI</h3>
          <p className="leading-relaxed">
            Workout AI is your personal, intelligent fitness planner. Using
            modern AI techniques, it generates customized workout plans based on
            your goals, fitness level, and preferences — so you can train
            smarter and stay consistent.
          </p>
        </div>

        {/* Card: How it works */}
        <div className="bg-white shadow-md rounded-xl p-6 border border-gray-100">
          <h3 className="text-lg font-semibold mb-3">How it works</h3>
          <p className="text-gray-700 leading-relaxed">
            Provide a few details — like your target (strength, hypertrophy, fat
            loss), available equipment, and weekly schedule — and Workout AI
            will assemble a progressive plan with exercises, sets, reps, and
            sensible progression. Plans adapt to your progress so you can keep
            moving forward.
          </p>
        </div>

        {/* Card: Mission & Vision */}
        <div className="shadow-md rounded-xl p-6 border border-gray-100  bg-violet-500 text-white">
          <h3 className="text-lg font-semibold mb-2">Mission</h3>
          <p className="mb-4">
            Make fitness planning effortless through AI, so anyone can get a
            tailored workout at their fingertips.
          </p>
          <h3 className="text-lg font-semibold mb-2">Vision</h3>
          <p className="">
            A world where personalization removes barriers to starting and
            maintaining a fitness habit.
          </p>
        </div>

        {/* Footer */}
        <p className="text-center text-xs text-gray-400">
          © 2025 John Raison Salvador — Built to make training simpler.
        </p>
      </div>
    </div>
  );
}
