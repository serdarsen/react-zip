import React from "react";
import Card from "./Card";
import Form from "./Form";
import Header from "./Header";
import "./lookup.scss";

type Prop = {
}

const Lookup: React.FC<Prop> = () => (
  <div className="lookup">
    <Card>
      <Header />
      <Form />
    </Card>
  </div>
);

export default Lookup;
