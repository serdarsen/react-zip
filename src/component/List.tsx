import React from "react";
import ItemModel from "../model/ItemModel";
import Item from "./Item";
import "./list.scss";

type Prop = {
    items: ItemModel[],
    onClickRow: Function
}

const List: React.FC<Prop> = ({ items, onClickRow }: Prop) => (
  <ul className="list">
    {items.map(
      (item) => <Item key={item.code} item={item} onClick={onClickRow} />,
    )}
  </ul>
);

export default List;
