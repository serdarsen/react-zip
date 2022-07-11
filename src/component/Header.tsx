import React from "react";
import "./header.scss";

type Prop = {
    title: string
}

const Header: React.FC<Prop> = ({ title }) => (
  <header className="header">
    <div className="header__title">
      {title}
    </div>
  </header>
);

export default Header;
