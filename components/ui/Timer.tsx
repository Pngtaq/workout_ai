"use client";

import { useEffect, useState } from "react";

export function Timer() {
  const [milliseconds, setMilliseconds] = useState(0);
  const [running, setRunning] = useState(false);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (running) {
      timer = setInterval(() => {
        setMilliseconds((ms) => ms + 10); // increment by 10ms
      }, 10);
    }
    return () => clearInterval(timer);
  }, [running]);

  const formatTime = (totalMs: number) => {
    const mins = Math.floor(totalMs / 60000)
      .toString()
      .padStart(2, "0");
    const secs = Math.floor((totalMs % 60000) / 1000)
      .toString()
      .padStart(2, "0");
    const ms = Math.floor((totalMs % 1000) / 10)
      .toString()
      .padStart(2, "0");
    return `${mins}:${secs}:${ms}`;
  };

  return (
    <div className="flex flex-col items-center p-4 bg-gray-50 rounded-lg border border-gray-200">
      <p className="text-lg font-semibold text-gray-500">Timer</p>
      <p className="text-4xl font-bold text-violet-500 mt-2">
        {formatTime(milliseconds)}
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
          onClick={() => setMilliseconds(0)}
          className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition"
        >
          Reset
        </button>
      </div>
    </div>
  );
}
