import React from "react";
import { lang } from "./App";

export const months_localized = {
  ru: [
    "января",
    "февраля",
    "марта",
    "апреля",
    "мая",
    "июня",
    "июля",
    "августа",
    "сентября",
    "октября",
    "ноября",
    "декабря",
  ],
  ua: [
    "січня",
    "лютого",
    "березня",
    "квітня",
    "травня",
    "червня",
    "липня",
    "серпня",
    "вересня",
    "жовтня",
    "листопада",
    "грудня",
  ],
  en: [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ],
  fr: [
    "janvier",
    "février",
    "mars",
    "avril",
    "mai",
    "juin",
    "juillet",
    "août",
    "septembre",
    "octobre",
    "novembre",
    "décembre",
  ],
  bg: [
    "Януари",
    "Февруари",
    "Март",
    "Април",
    "Май",
    "Юни",
    "Юли",
    "Август",
    "Септември",
    "Октомври",
    "Ноември",
    "Декември",
  ],
};

export const days_localized = {
  ru: [
    "воскресенье",
    "понедельник",
    "вторник",
    "среда",
    "четверг",
    "пятница",
    "суббота",
  ],
  ua: [
    "неділя",
    "понеділок",
    "вівторок",
    "середа",
    "четвер",
    "п'ятниця",
    "субота",
  ],
  en: [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ],
  fr: ["Dimanche", "Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi", "Samedi"],
  bg: [
    "Неделя",
    "Понеделник",
    "Вторник",
    "Сряда",
    "Четвъртък",
    "Петък",
    "Събота",
  ],
};

function FirstDialog({ setShowFirstDialog, item, filepath }) {
  const currentDate = new Date();
  const monthIndex = currentDate.getMonth();
  const dayIndex = currentDate.getDay();
  const formattedDate = `${currentDate.getDate()} ${
    months_localized[lang][monthIndex]
  } ${currentDate.getFullYear()}`;
  const dayOfWeek = days_localized[lang][dayIndex];

  return (
    <div className="w-80 md:w-96 lg:w-1/3 xl:w-1/4 flex flex-col justify-center items-center bg-white rounded-md shadow-md p-8 animate-scaleIn">
      <img
        src={`${filepath}box-1.png`}
        alt="box"
        className="mx-auto mb-4 shakeDialog"
      />
      <h2 className="font-semibold text-neutral-700 text-center mb-4">
        Вітаємо, ви підтвердили, що ви реальна людина.
      </h2>
      <p className="text-center mb-4">
        Сьогодні, {dayOfWeek}, {formattedDate}, ви можете отримати {item}.
      </p>
      <p className="text-center mb-4">
        Все, що вам потрібно зробити, це вибрати правильну подарункову коробку.
      </p>
      <p className="text-center mb-4">У вас є три спроби, тож удачі!</p>
      <button
        onClick={() => setShowFirstDialog(false)}
        className="button-color text-white font-semibold py-2 px-4 w-[90px] rounded"
      >
        OK
      </button>
    </div>
  );
}

export default FirstDialog;
