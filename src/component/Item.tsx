import React from "react";
import { Place } from "../model/Data";
import "./item.scss";

type Prop = {
    place: Place,
    onClick: Function;
}

const Item: React.FC<Prop> = ({ place, onClick }: Prop) => (
  <li key={place.postal_code} onClick={() => onClick(place)} onKeyDown={() => {}} role="row" className="item">
    {place.postal_code}
    {" "}
    {place.city}
    {" "}
    {place.state}
  </li>
);

export default Item;
