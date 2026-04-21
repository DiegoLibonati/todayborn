import { useState } from "react";

import type { JSX } from "react";

import Item from "@/components/Item/Item";

import arrBirthdays from "@/constants/birthdays";

import "@/pages/TodaybornPage/TodaybornPage.css";

const TodaybornPage = (): JSX.Element => {
  const [birthdays, setBirthdays] = useState(arrBirthdays);

  const handleClear: React.MouseEventHandler<HTMLButtonElement> = () => {
    setBirthdays([]);
  };

  return (
    <main className="todayborn-page" aria-label="Today's birthdays">
      <h2 className="todayborn-page__title">{birthdays.length} birthdays today</h2>

      <ul className="todayborn-page__list" aria-label="Birthday list">
        {birthdays.map((birthday) => (
          <Item
            key={birthday.id}
            age={birthday.age}
            image={birthday.image}
            name={birthday.name}
          ></Item>
        ))}
      </ul>

      <button
        onClick={handleClear}
        className="todayborn-page__clear-all"
        aria-label="Clear all birthdays from the list"
      >
        Clear ALL
      </button>
    </main>
  );
};

export default TodaybornPage;
