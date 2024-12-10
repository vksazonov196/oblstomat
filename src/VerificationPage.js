import React, { useState, useEffect } from "react";
import Spinner from "./Spinner";

function VerificationPage({ filepath }) {
  const [showText1, setShowText1] = useState(false);
  const [showText2, setShowText2] = useState(false);
  const [showText3, setShowText3] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setShowText1(true);
    }, 2000);

    setTimeout(() => {
      setShowText2(true);
    }, 2500);

    setTimeout(() => {
      setShowText3(true);
    }, 3000);
  }, []);

  return (
    <div className="flex flex-col items-center justify-start min-h-screen">
      <div className="text-center">
        <h2 className="font-bold text-3xl text-[#232F3E] mb-2">
          Ваші відповіді будуть перевірені
        </h2>
        <div className="mt-4 flex justify-center w-full">
          <Spinner filepath={filepath} />
        </div>
      </div>

      <div className="flex flex-col items-center justify-center mt-8">
        <div
          className={`text-center ${
            showText1
              ? "opacity-100 transition-opacity duration-500"
              : "opacity-0"
          }`}
        >
          <h2 className="font-semibold text-lg text-[#232F3E] mb-2">
            Ви відповіли на 3/3 питання!
          </h2>
        </div>

        <div
          className={`text-center mt-4 ${
            showText2
              ? "opacity-100 transition-opacity duration-500"
              : "opacity-0"
          }`}
        >
          <p className="font-semibold text-lg text-[#232F3E] mb-2">
            Раніше не було розслідувань щодо вашої IP-адреси
          </p>
        </div>

        <div
          className={`text-center mt-4 ${
            showText3
              ? "opacity-100 transition-opacity duration-500"
              : "opacity-0"
          }`}
        >
          <p className="font-semibold text-lg text-[#232F3E] mb-2">
            Подарунки ще доступні!
          </p>
        </div>
      </div>
    </div>
  );
}

export default VerificationPage;
