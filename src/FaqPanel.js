import React, { useState } from "react";

function FaqPanel({ faqOpen, setFaqOpen, price, filepath }) {
  const [expandedIndex, setExpandedIndex] = useState(null);

  const faqItems = [
    {
      title: "Скільки часу потрібно чекати на отримання знижки?",
      sub: "Ви можете використати знижку одразу після виграшу",
    },
    {
      title: "Чи є приховані витрати?",
      sub: "Абсолютно ні. Якщо ви виграли знижку, введіть свої дані, і ми зробимо все інше",
    },
    {
      title: "Я переможець, чому я повинен відповідати на питання / вгадувати коробку?",
      sub: "Ви ще не переможець, але ви один з небагатьох людей, обраних для спроби виграти приз",
    },
    {
      title: "Як я отримаю свою знижку, якщо виграю?",
      sub: "Спочатку вам потрібно заповнити форму та контактні дані. Після цього ви будете керуватися через нашу систему.",
    },
    {
      title: "Скільки разів я можу використовувати знижку?",
      sub: "Ви можете використовувати знижку лише один раз",
    }
  ];

  const toggleItem = (index) => {
    if (expandedIndex === index) {
      setExpandedIndex(null);
    } else {
      setExpandedIndex(index);
    }
  };

  return (
    <div
      className={`fixed z-[100] top-0 right-0 h-full sm:w-full lg:w-[300px] bg-white shadow-lg transform transition-transform duration-300 ${
        faqOpen ? "translate-x-0" : "translate-x-full"
      }`}
    >
      <div className="flex justify-end">
        <button
          className="w-10 h-10 font-bold text-xl hover:text-gray-700 focus:outline-none border-3 border-black rounded-full flex items-center justify-center"
          onClick={() => setFaqOpen(false)}
        >
          &times;
        </button>
      </div>

      <div className="p-4">
        {faqItems.map((item, index) => (
          <div key={index} className="mt-4 border-b border-black">
            <div
              className="flex justify-between cursor-pointer gap-2 items-center"
              onClick={() => toggleItem(index)}
            >
              <div className="max-w-[230px]">
                <h3 className="text-lg font-semibold">{item.title}</h3>
              </div>

              <div
                className={`transform transition-transform ${
                  expandedIndex === index ? "rotate-180" : "rotate-0"
                }`}
                style={{ width: "12px", height: "10px" }}
              >
                <img
                  src={`${filepath}arrow.svg`}
                  alt="arrow"
                  className="h-2 w-3"
                />
              </div>
            </div>
            <div
              className={`faq-item ${expandedIndex === index ? "active" : ""}`}
            >
              <p className="text-sm mt-2">{item.sub}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default FaqPanel;
