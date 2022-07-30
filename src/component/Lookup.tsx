import React, { useState } from "react";
import DataService from "../service/DataService";
import Card from "./Card";
import Form from "./Form";
import Header from "./Header";
import List from "./List";
import "./lookup.scss";

type Prop = {
}

const Lookup: React.FC<Prop> = () => {
  const [data, setData] = useState();

  const fetchData = async (postalCode: string) => {
    const response = await DataService.fetchData(postalCode);
    const { data } = response || {};
    setData(data);
  };

  const onChangeForm = (postalCode: string) => {
    fetchData(postalCode);
  };

  const onClickList = () => {
    setData(null);
  };

  return (
    <div className="lookup">
      <Card>
        <Header />
        <Form onChange={onChangeForm} />
        <List data={data} onClick={onClickList} />
      </Card>
    </div>
  );
};

export default Lookup;
