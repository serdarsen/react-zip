import React, { useState } from "react";
import ItemModel from "../model/ItemModel";
import Card from "./Card";
import Form from "./Form";
import Header from "./Header";
import List from "./List";
import "./lookup.scss";

type Prop = {
}

const Lookup: React.FC<Prop> = () => {
  const [currentItem, setCurrentItem] = useState(null);
  const [items, setItems] = useState([]);

  const onClickRow = (item: ItemModel) => {
    setItems([]);
    setCurrentItem(item);
  };

  const createTitle = () => {
    let title = "US Zip(Postal) Codes";

    if (currentItem) {
      title = `${currentItem.code} ${currentItem.city} ${currentItem.state}`;
    }

    return title;
  };

  return (
    <div className="lookup">
      <Card>
        <Header title={createTitle()} />
        <Form onChangeRequestItems={setItems} />
        <List items={items} onClickRow={onClickRow} />
      </Card>
    </div>
  );
};

export default Lookup;
