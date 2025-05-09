import countries from "./data/countries_merged.json";

import Map from "./components/Map";
import SearchField from "./components/SearchField";
import InfoField from "./components/InfoField";
import SelectLanguage from "./components/SelectLanguage";
import MapUtilityPanel from "./components/MapUtilityPanel";
import GreetingsEffect from "./components/GreetingsEffect";

import { showFireworks } from "./utilty/selectEffect";

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
    mapUtilityPanel.setState(newState);
    infoField.setState(newState);
  };

  // 나라 선택 시 효과 띄우기
  const startSelectEffect = (countryA2) => {
    const { greetings, lang } = countries.filter(
      (c) => c.alpha2 === countryA2
    )[0];
    if (greetings) showFireworks(greetings, lang);
  };

  const map = new Map({
    $app,
    countries,
    initialState: this.state,
    onClick: (select, countryA2) => {
      let newSelected = [...this.state.selectedCountries];

      if (select) {
        newSelected.push(countryA2);

        startSelectEffect(countryA2);
      } else {
        newSelected = newSelected.filter((c) => c !== countryA2);
      }
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

        startSelectEffect(countryA2);
      } else {
        newSelected = newSelected.filter((c) => c !== countryA2);
      }
      this.setState({ ...this.state, selectedCountries: newSelected });
    },
  });

  const mapUtilityPanel = new MapUtilityPanel({
    $app,
    initialState: this.state,
    onClickReset: () => {
      this.setState({ ...this.state, selectedCountries: [] });
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

  // 나라 선택 시 인사말 띄우기 효과
  new GreetingsEffect({ $app });
}
