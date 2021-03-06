import React, { ReactNode } from "react";
import "./card.scss";

type Prop = {
    children: ReactNode
}

const Card: React.FC<Prop> = ({ children }: Prop) => (
  <div className="card">
    {children}
  </div>
);

export default Card;
