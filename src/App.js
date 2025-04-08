import countries_ko from "./data/countries_ko.json";

import Map from "./components/Map";
import SearchField from "./components/SearchField";

export default function App($app) {
  this.state = {
    selectedCountries: [], // alpha2
  };

  this.setState = (newState) => {
    this.state = newState;
    map.setState(newState.selectedCountries);
    searchField.setState(newState.selectedCountries);
  };

  const map = new Map({
    $app,
    countries_ko,
    initialState: [],
    onClick: (select, countryA2) => {
      let newSelected = [...this.state.selectedCountries];

      if (select) newSelected.push(countryA2);
      else newSelected = newSelected.filter((c) => c !== countryA2);
      this.setState({ selectedCountries: newSelected });
    },
  });

  const searchField = new SearchField({
    $app,
    countries_ko,
    initialState: [],
    onCheck: (checkbox) => {
      const countryA2 = checkbox.id;
      let newSelected = [...this.state.selectedCountries];

      if (checkbox.checked) {
        newSelected.push(countryA2);
      } else {
        newSelected = newSelected.filter((c) => c !== countryA2);
      }
      this.setState({ selectedCountries: newSelected });
    },
  });

  this.init = () => {};
}
