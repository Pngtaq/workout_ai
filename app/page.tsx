"use client";

import { motion } from "framer-motion";
import { ArrowRight, Dumbbell, Brain, Sparkles } from "lucide-react";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-violet-500 to-violet-700 text-white flex flex-col">
      {/* Hero Section */}
      <section className="flex flex-col items-center justify-center text-center flex-1 px-6 py-20">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-4xl md:text-6xl font-extrabold mb-6 leading-tight"
        >
          Your AI-Powered Workout Partner
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="text-lg md:text-xl text-violet-100 max-w-2xl mb-8"
        >
          Workout AI helps you create personalized fitness plans using
          artificial intelligence — tailored to your goals, fitness level, and
          lifestyle.
        </motion.p>

        <motion.a
          href="#features"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="inline-flex items-center gap-2 bg-white text-violet-700 px-6 py-3 rounded-full font-semibold shadow-lg transition-colors hover:bg-violet-100"
        >
          Get Started <ArrowRight size={20} />
        </motion.a>
      </section>

      {/* Features Section */}
      <section
        id="features"
        className="bg-white text-gray-900 px-6 py-16 md:px-20"
      >
        <div className="max-w-6xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-3xl md:text-4xl font-bold text-center mb-12"
          >
            Why Choose Workout AI?
          </motion.h2>

          <div className="grid gap-10 md:grid-cols-3">
            <FeatureCard
              icon={<Dumbbell size={32} />}
              title="Smart Training Plans"
              description="Generate workouts tailored to your goals, from building muscle to improving endurance."
            />
            <FeatureCard
              icon={<Brain size={32} />}
              title="AI-Powered Insights"
              description="Get recommendations backed by AI to optimize your training efficiency."
            />
            <FeatureCard
              icon={<Sparkles size={32} />}
              title="Track Your Progress"
              description="Easily monitor your fitness journey and adjust your plan as you improve."
            />
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-violet-600 px-6 py-12 md:py-20">
        <div className="max-w-4xl mx-auto text-center">
          <motion.h3
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-2xl md:text-3xl font-bold mb-6"
          >
            Start Your AI Workout Journey Today
          </motion.h3>
          <motion.a
            href="#"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-block bg-white text-violet-700 px-8 py-3 rounded-full font-semibold shadow-lg hover:bg-violet-100 transition"
          >
            Sign Up Free
          </motion.a>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-violet-800 text-violet-200 py-6 text-center text-sm">
        © {new Date().getFullYear()} Workout AI. All rights reserved.
      </footer>
    </main>
  );
}

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
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="bg-gray-50 rounded-xl p-6 shadow hover:shadow-lg transition"
    >
      <div className="text-violet-600 mb-4">{icon}</div>
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </motion.div>
  );
}
