// components/dashboard/Clock.tsx
import { useEffect, useState } from "react";

export function Clock() {
  const [time, setTime] = useState("");

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(new Date().toLocaleTimeString());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col items-center p-4 bg-gray-50 rounded-lg border border-gray-200">
      <p className="text-lg font-semibold text-gray-500">Current Time</p>
      <p className="text-4xl font-bold text-violet-500 mt-2">{time}</p>
    </div>
  );
}
