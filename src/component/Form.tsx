import React, { useEffect, useState } from "react";
import "./form.scss";

type Prop = {
    onChange: Function
}

const Form: React.FC<Prop> = ({ onChange }: Prop) => {
  const numberRegEx = /^\d+$/;
  const [error, setError] = useState("");
  const [postalCode, setPostalCode] = useState("");

  const isValid = (value:string) => numberRegEx.test(String(value).toLowerCase());

  useEffect(() => {
    if (isValid(postalCode)
    && postalCode && postalCode.length > 3) {
      onChange(postalCode);
    }
  }, [postalCode]);

  return (
    <div className="form">
      <form>
        <input
          type="text"
          className="form__input form__element"
          placeholder="Please enter a zip(postal) code"
          value={postalCode}
          onChange={(e) => {
            const { value } = e.target;
            if (isValid(value) || value === "") {
              setError("");
            } else {
              setError("Please enter digits only.");
            }

            setPostalCode(value);
          }}
          required
          maxLength={255}
          title={postalCode}
        />
      </form>
      <span className={`form__error ${error ? "" : "form__error-hidden"}`}>
        {error}
      </span>
    </div>
  );
};

export default Form;
