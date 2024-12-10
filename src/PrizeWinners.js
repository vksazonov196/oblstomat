import React, { useState, useEffect } from "react";


export default function PrizeWinners({ name, place, item, time, filepath }) {
  const [visible, setVisible] = useState(true);
  const [animationClass, setAnimationClass] = useState("fade-enter");

  useEffect(() => {
    const enterTimer = setTimeout(() => {
      setAnimationClass("fade-enter-active");
    }, 50);

    return () => {
      clearTimeout(enterTimer);
    };
  }, []);

  useEffect(() => {
    if (!visible) {
      setAnimationClass("fade-exit");
      const exitTimer = setTimeout(() => {
        setAnimationClass("fade-exit-active");
      }, 50);
      return () => clearTimeout(exitTimer);
    }
  }, [visible]);

  if (!visible) {
    return null;
  }

  return (
    <div
      className={`absolute right-4 p-2 flex items-center gap-2 z-[100] border rounded-md max-w-[300px] bg-white ${animationClass}`}
    >
      <button
        className="absolute top-1 right-1 w-3 h-3 text-gray-500 hover:text-gray-700 focus:outline-none border rounded-full flex items-center justify-center"
        onClick={() => setVisible(false)}
      >
        &times;
      </button>
      <img src={`${filepath}main.png`} alt="main" className="h-10" />
      <div>
        <div className="flex gap-1">
          <p className="text-xs font-bold">{name}</p>
          <p className="text-xs underline">{place}</p>
        </div>
        <p className="font-semibold text-blue-500">виграв {item}</p>
        <p className="text-xs">{time}</p>
      </div>
    </div>
  );
}
