import axios from "axios";

export const fetchPickUpLocations = async (numResults, searchTerm) => {
  const response = await axios.get(
    `https://www.rentalcars.com/FTSAutocomplete.do?solrIndex=fts_en&solrRows=${numResults}&solrTerm=${searchTerm}`
  );
  return response.data.results ? response.data.results.docs : [];
};
