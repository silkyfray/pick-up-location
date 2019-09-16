import React from "react";
import PropTypes from "prop-types";

import "./ResultsItem.scss";

const ResultsItem = ({ type, name, abbrev, country }) => (
  <li>
    {type && <div className="ResultsItem__type">{type}</div>
    }<div>
      {name} {abbrev && `(${abbrev})`}
    </div>
    <div>{country}</div>
  </li>
);

ResultsItem.propTypes = {
  type: PropTypes.string,
  name: PropTypes.string.isRequired,
  abbrev: PropTypes.string,
  country: PropTypes.string
};

export default ResultsItem;
