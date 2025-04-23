import countries_ko from "./data/countries_ko.json";

import Map from "./components/Map";
import SearchField from "./components/SearchField";
import InfoField from "./components/InfoField";

export default function App($app) {
  this.state = {
    selectedCountries: [], // alpha2
  };

  this.setState = (newState) => {
    this.state = newState;
    map.setState(newState.selectedCountries);
    searchField.setState({
      ...searchField.state,
      selectedCountries: newState.selectedCountries,
    });
    infoField.setState(newState.selectedCountries);
  };

  // 리셋 버튼
  this.$resetBtn = document.createElement("button");
  this.$resetBtn.className = "reset-button hidden";
  this.$resetBtn.textContent = "리셋하기";
  this.$resetBtn.addEventListener("click", () => {
    this.setState({ selectedCountries: [] });
  });
  $app.appendChild(this.$resetBtn);

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
    initialState: { selectedCountries: [], inputString: "" },
    onCheck: (listItem) => {
      const countryA2 = listItem.id;
      const checkbox = listItem.querySelector("span.checkbox");

      let newSelected = [...this.state.selectedCountries];
      if (!checkbox.classList.contains("checked")) {
        newSelected.push(countryA2);
      } else {
        newSelected = newSelected.filter((c) => c !== countryA2);
      }
      this.setState({ selectedCountries: newSelected });
    },
  });

  const infoField = new InfoField({ $app, initialState: [] });

  this.init = () => {};
}
