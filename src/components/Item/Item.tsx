import type { JSX } from "react";
import type { ItemProps } from "@/types/props";

import "@/components/Item/Item.css";

const Item = ({ age, image, name }: ItemProps): JSX.Element => {
  return (
    <li className="person" aria-label={`${name}, ${age} years old`}>
      <img src={image} alt={`Profile photo of ${name}`} className="person__img" />
      <div className="person__description" aria-hidden="true">
        <h3 className="person__name">{name}</h3>
        <p className="person__years">{age} years</p>
      </div>
    </li>
  );
};

export default Item;
