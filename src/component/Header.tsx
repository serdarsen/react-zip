import React from "react";
import "./header.scss";

type Prop = {
}

const Header: React.FC<Prop> = () => (
  <header className="header">
    <div className="header__title">
      Header
    </div>
  </header>
);

export default Header;
