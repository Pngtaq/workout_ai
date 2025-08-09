import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-800">
      <p className="text-[130px] bg-gradient-to-r from-blue-700 to-blue-300 bg-clip-text text-transparent">
        Workout AI
      </p>
      <div className="space-x-5">
        <Link
          href="/dashboard"
          className="text-white bg-gradient-to-r from-blue-600  to-blue-500 hover:bg-gradient-to-br font-bold rounded-lg text-lg px-5 py-3 text-center "
        >
          Get Started
        </Link>
        <Link
          href="/about"
          className="text-white bg-gradient-to-r from-blue-600  to-blue-500 hover:bg-gradient-to-br font-bold rounded-lg text-lg py-3 text-center px-7"
        >
          About Us
        </Link>
      </div>
      <p className="text-white text-xl w-1/2 text-center mt-10 ">
        Your smart companion for achieving your fitness and nutrition goals. Our
        app helps you create personalized diet plans and workout routines
        tailored to your body type, lifestyle, and goals.
      </p>
    </div>
  );
}
