import React from "react";
import ItemModel from "../model/ItemModel";
import "./item.scss";

type Prop = {
    item: ItemModel,
    onClick: Function;
}

const Item: React.FC<Prop> = ({ item, onClick }: Prop) => (
  <li key={item.code} onClick={() => onClick(item)} onKeyDown={() => {}} role="row" className="item">
    {item.code}
    {" "}
    {item.city}
    {" "}
    {item.state}
  </li>
);

export default Item;
