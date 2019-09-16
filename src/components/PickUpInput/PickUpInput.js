import React, { useState } from "react";
import PropTypes from "prop-types";
import debounce from "p-debounce";
import SVG from "react-inlinesvg/lib";

import "./PickUpInput.scss";
import ResultsItem from "./ResultsItem";
import Spinner from "../../assets/spinner.svg";

import { fetchPickUpLocations } from "../../services/pickUpLocationService";

const fetchPickUpLocationsDebounced = debounce(fetchPickUpLocations, 300);

const getType = rawType => rawType && rawType.substr(0, rawType.indexOf("-"));

const PickUpInput = ({ minCharsToSearch, maxResults }) => {
  const [locations, setLocations] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleOnChange = async ({ target: { value } }) => {
    let results;
    if (value.length < minCharsToSearch) {
      results = [];
    } else {
      setLoading(true);
      results = await fetchPickUpLocationsDebounced(maxResults, value);
      setLoading(false);
    }
    setLocations(results);
  };

  return (
    <div className="PickUpInput">
      <label htmlFor="pickUpInput">Pick-up Location</label>
      <input
        id="pickUpInput"
        placeholder="city, airport, station, region, district..."
        onChange={handleOnChange}
        aria-label="Please enter a location"
      />
      {loading && <SVG src={Spinner} />}
      <ol>
        {locations.length && !locations[0].placeKey ? (
          <div>{locations[0].name}</div>
        ) : (
          locations.map(loc => {
            return (
              <ResultsItem
                key={loc.placeKey}
                type={getType(loc.bookingId)}
                name={loc.name}
                abbrev={loc.iata}
                country={loc.country}
              />
            );
          })
        )}
      </ol>
    </div>
  );
};

PickUpInput.propTypes = {
  minCharsToSearch: PropTypes.number,
  maxResults: PropTypes.number
};

PickUpInput.defaultTypes = {
  minCharsToSearch: 2,
  maxResults: 6
};

export default PickUpInput;
