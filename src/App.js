import countries from "./data/countries_merged.json";

import Map from "./components/Map";
import SearchField from "./components/SearchField";
import InfoField from "./components/InfoField";
import SelectLanguage from "./components/SelectLanguage";

export default function App($app) {
  this.state = {
    lang: "ko", // 언어
    selectedCountries: [], // alpha2
  };

  this.setState = (newState) => {
    this.state = newState;
    map.setState(newState);
    searchField.setState({
      ...searchField.state,
      lang: newState.lang,
      selectedCountries: newState.selectedCountries,
    });
    infoField.setState(newState);
  };

  // 리셋 버튼
  this.$resetBtn = document.createElement("button");
  this.$resetBtn.className = "reset-button hidden";
  this.$resetBtn.textContent = this.state.lang === "ko" ? "리셋하기" : "Reset";
  this.$resetBtn.addEventListener("click", () => {
    this.setState({ ...this.state, selectedCountries: [] });
  });
  $app.appendChild(this.$resetBtn);

  const map = new Map({
    $app,
    countries,
    initialState: this.state,
    onClick: (select, countryA2) => {
      let newSelected = [...this.state.selectedCountries];

      if (select) newSelected.push(countryA2);
      else newSelected = newSelected.filter((c) => c !== countryA2);
      this.setState({ ...this.state, selectedCountries: newSelected });
    },
  });

  const searchField = new SearchField({
    $app,
    countries,
    initialState: this.state,
    onCheck: (listItem) => {
      const countryA2 = listItem.id;
      const checkbox = listItem.querySelector("span.checkbox");

      let newSelected = [...this.state.selectedCountries];
      if (!checkbox.classList.contains("checked")) {
        newSelected.push(countryA2);
      } else {
        newSelected = newSelected.filter((c) => c !== countryA2);
      }
      this.setState({ ...this.state, selectedCountries: newSelected });
    },
  });

  const infoField = new InfoField({ $app, initialState: this.state });

  // 언어 설정
  new SelectLanguage({
    $app,
    setState: () =>
      this.setState({
        ...this.state,
        lang: this.state.lang === "ko" ? "en" : "ko",
      }),
  });

  this.init = () => {};
}
