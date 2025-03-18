fetch("./data/countries_ko.json")
  .then((res) => res.json())
  .then((countries) => {
    const countryList = document.getElementById("country-list");

    countries.forEach((country) => {
      const listItem = document.createElement("li");

      listItem.innerHTML = `
        <input type="checkbox" />
        <label>${country.name}</label>
      `;

      countryList.appendChild(listItem);
    });
  });
