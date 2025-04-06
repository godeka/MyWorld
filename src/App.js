import Map from "./components/Map";

export default function App($app) {
  this.state = {
    selectedCountry: [],
  };

  this.setState = (newState) => {
    this.state = newState;
  };

  const map = new Map({ $app, initialState: [] });

  this.init = () => {};
}
