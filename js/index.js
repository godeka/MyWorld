fetch("./data/countries_ko.json")
  .then((res) => res.json())
  .then((countries) => {
    const countryList = document.getElementById("country-list");

    countries.forEach((country) => {
      const listItem = document.createElement("li");
      listItem.style.marker;

      const checkBox = document.createElement("input");
      checkBox.type = "checkbox";
      const label = document.createElement("label");
      label.innerText = country.name;

      listItem.appendChild(checkBox);
      listItem.appendChild(label);

      countryList.appendChild(listItem);
    });
  });
