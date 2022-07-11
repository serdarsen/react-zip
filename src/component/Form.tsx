import React, { useEffect, useState } from "react";
import PlaceService from "../service/PlaceService";
import "./form.scss";

type Prop = {
    onChangeRequestItems: Function
}

const Form: React.FC<Prop> = ({ onChangeRequestItems }: Prop) => {
  const numberRegEx = /^\d+$/;
  const [error, setError] = useState("");
  const [zipcode, setZipcode] = useState("");

  const findItems = async () => {
    const response = await PlaceService.findPlaces(zipcode);

    const { data } = response || {};
    const { results } = data || {};
    if (!results) {
      return;
    }

    const places = results[zipcode] || [];
    const items = places.map((place) => ({
      code: place.postal_code,
      city: place.city,
      state: place.state,
    }));

    onChangeRequestItems(items);
  };

  const onSubmitForm = () => {

  };

  const isValid = (value:string) => numberRegEx.test(String(value).toLowerCase());

  useEffect(() => {
    if (isValid(zipcode)
    && zipcode && zipcode.length > 3) {
      findItems();
    }
  }, [zipcode]);

  return (
    <div className="form">
      <form onSubmit={onSubmitForm}>
        <input
          type="text"
          className="form__input form__element"
          placeholder="Please enter a zip(postal) code"
          value={zipcode}
          onChange={(e) => {
            const { value } = e.target;
            if (isValid(value) || value === "") {
              setError("");
            } else {
              setError("Please enter digits only.");
            }

            setZipcode(value);
          }}
          required
          maxLength={255}
          title={zipcode}
        />
      </form>
      <span className={`form__error ${error ? "" : "form__error-hidden"}`}>
        {error}
      </span>
    </div>
  );
};

export default Form;
