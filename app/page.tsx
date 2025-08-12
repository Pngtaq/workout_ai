function FeatureCard({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
}) {
  return (
    <div className="bg-gray-50 rounded-xl p-6 shadow text-gray-900 hover:shadow-lg transition">
      <div className="text-violet-600 mb-4">{icon}</div>
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  );
}

export default function HomePage() {
  return (
    <main className="min-h-screen bg-violet-500 text-white flex flex-col">
      {/* Hero Section */}
      <section className="flex flex-col items-center justify-center flex-1 px-6 py-20 text-center">
        <h1 className="text-4xl md:text-6xl font-extrabold mb-6">
          Your AI-Powered Workout Partner
        </h1>
        <p className="text-lg md:text-xl max-w-2xl text-violet-100">
          Workout AI helps you create personalized fitness plans using
          artificial intelligence — tailored to your goals, fitness level, and
          lifestyle.
        </p>
      </section>

      {/* Features Section */}
      <section className="bg-white text-gray-900 px-6 py-16 md:px-20">
        <div className="max-w-6xl mx-auto grid gap-10 md:grid-cols-3">
          <FeatureCard
            icon={"🏋️"}
            title="Smart Training Plans"
            description="Generate workouts tailored to your goals."
          />
          <FeatureCard
            icon={"🧠"}
            title="AI-Powered Insights"
            description="Get recommendations backed by AI."
          />
          <FeatureCard
            icon={"✨"}
            title="Track Your Progress"
            description="Monitor your fitness journey with ease."
          />
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-violet-800 text-violet-200 py-6 text-center text-sm">
        © {new Date().getFullYear()} Workout AI. All rights reserved.
      </footer>
    </main>
  );
}
