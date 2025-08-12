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
    </main>
  );
}
