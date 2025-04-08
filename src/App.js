import Map from "./components/Map";
import SearchField from "./components/SearchField";

export default function App($app) {
  this.state = {
    selectedCountry: [],
  };

  this.setState = (newState) => {
    this.state = newState;
    searchField.setState(newState.selectedCountry);
    // console.log(newState.selectedCountry);
  };

  const map = new Map({ $app, initialState: [] });
  const searchField = new SearchField({
    $app,
    initialState: [],
    onCheck: (checkbox) => {
      const idNumber = Number(checkbox.id);
      let newSelected = [...this.state.selectedCountry];
      if (checkbox.checked) {
        newSelected.push(idNumber);
      } else {
        newSelected = newSelected.filter((c) => c !== idNumber);
      }
      this.setState({ selectedCountry: newSelected });
    },
  });

  this.init = () => {};
}
