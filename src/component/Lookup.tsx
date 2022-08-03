import React, { useState } from "react";
import Select from "react-select";
import { Place, Results } from "../model/Data";
import { Option } from "../model/Option";
import DataService from "../service/DataService";

type Prop = {
}

const Lookup: React.FC<Prop> = () => {
  const [options, setOptions] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [city, setCity] = useState(null);
  const [state, setState] = useState(null);
  const [postalCode, setPostalCode] = useState(null);
  const [countryCode, setCountryCode] = useState(null);
  const numberRegEx = /^\d+$/;

  const isNumber = (value:string) => numberRegEx.test(String(value).toLowerCase());

  const createOptions = (results: Results) => {
    const options: Option[] = [];

    Object.keys(results).forEach((resultKey) => {
      results[resultKey].forEach(
        (place: Place, index: number) => {
          options.push({
            value: `${place.postal_code}${index}`,
            label: `${place.city} ${place.state} ${place.postal_code} ${place.country_code}`,
            place,
          });
        },
      );
    });

    return options;
  };

  const fetchData = async (postalCode: string) => {
    setIsLoading(true);
    const response = await DataService.fetchData(postalCode);
    const { data } = response || {};
    const { results = {} } = data || {};
    const options = createOptions(results);
    setOptions(options);
    setIsLoading(false);
  };

  const onInputChange = (postalCode: string) => {
    if (isNumber(postalCode)) {
      fetchData(postalCode);
    }
  };

  const onChange = (option: Option) => {
    const { place } = option || {};
    setCity(place.city);
    setState(place.state);
    setPostalCode(place.postal_code);
    setCountryCode(place.country_code);
  };

  return (
    <div className="container">
      <div className="row justify-content-center h-75">
        <div className="col-12 col-lg-6 align-self-center">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title mb-2">Zip Postal Codes</h5>
              <Select className="mb-2" options={options} isLoading={isLoading} placeholder="Enter Postal Code" onInputChange={onInputChange} onChange={onChange} />
              <div className="form">
                <input type="text" className="form-control mb-2" id="city" placeholder="City" value={city} onChange={(e) => setCity(e.target.value)} />
                <input type="text" className="form-control mb-2" id="state" placeholder="State" value={state} onChange={(e) => setState(e.target.value)} />
                <input type="text" className="form-control mb-2" id="postal_code" placeholder="Postal Code" value={postalCode} onChange={(e) => setPostalCode(e.target.value)} />
                <input type="text" className="form-control mb-2" id="country_code" placeholder="Country Code" value={countryCode} onChange={(e) => setCountryCode(e.target.value)} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Lookup;
