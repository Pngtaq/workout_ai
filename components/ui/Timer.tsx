// components/dashboard/Timer.tsx
import { useEffect, useState } from "react";

export function Timer() {
  const [seconds, setSeconds] = useState(0);
  const [running, setRunning] = useState(false);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (running) {
      timer = setInterval(() => setSeconds((s) => s + 1), 1000);
    }
    return () => clearInterval(timer);
  }, [running]);

  const formatTime = (totalSeconds: number) => {
    const mins = Math.floor(totalSeconds / 60)
      .toString()
      .padStart(2, "0");
    const secs = (totalSeconds % 60).toString().padStart(2, "0");
    return `${mins}:${secs}`;
  };

  return (
    <div className="flex flex-col items-center p-4 bg-gray-50 rounded-lg border border-gray-200">
      <p className="text-lg font-semibold text-gray-500">Timer</p>
      <p className="text-4xl font-bold text-violet-500 mt-2">
        {formatTime(seconds)}
      </p>
      <div className="flex gap-2 mt-4">
        <button
          onClick={() => setRunning(true)}
          className="px-4 py-2 bg-violet-500 text-white rounded hover:bg-violet-600 transition"
        >
          Start
        </button>
        <button
          onClick={() => setRunning(false)}
          className="px-4 py-2 bg-gray-300 text-gray-800 rounded hover:bg-gray-400 transition"
        >
          Stop
        </button>
        <button
          onClick={() => setSeconds(0)}
          className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition"
        >
          Reset
        </button>
      </div>
    </div>
  );
}
