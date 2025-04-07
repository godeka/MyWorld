import Map from "./components/Map";
import SearchField from "./components/SearchField";

export default function App($app) {
  this.state = {
    selectedCountry: [],
  };

  this.setState = (newState) => {
    this.state = newState;
  };

  const map = new Map({ $app, initialState: [] });
  const searchField = new SearchField({
    $app,
    initialState: [],
  });

  this.init = () => {};
}
