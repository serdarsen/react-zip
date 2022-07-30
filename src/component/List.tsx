import React, { useState } from "react";
import { Data, Place } from "../model/Data";
import Item from "./Item";
import "./list.scss";

type Prop = {
    data: Data,
    onClick: Function
}

const List: React.FC<Prop> = ({ data, onClick }: Prop) => {
  const [selected, setSelected] = useState(null);
  const { results = {} } = data || {};

  const onClickItem = (place: Place) => {
    onClick(place);
    setSelected(place);
  };

  return (
    <ul className="list">
      {selected && <Item key={selected.postal_code} place={selected} onClick={() => {}} />}
      {Object.keys(results).map((resultKey) => (
        results[resultKey].map(
          (place) => <Item key={place.postal_code} place={place} onClick={onClickItem} />,
        )
      ))}
    </ul>
  );
};

export default List;
