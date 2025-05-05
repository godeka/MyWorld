export default function SearchField({
  $app,
  countries,
  initialState,
  onCheck,
}) {
  this.state = { ...initialState, inputString: "" }; // { lang: "ko", selectedCountries: [], inputString: "" }
  this.$target = document.createElement("div");
  this.$target.className = "search-container";

  $app.appendChild(this.$target);

  this.setState = (newState) => {
    this.state = newState;
    this.render();
  };

  this.init = () => {
    let temp = [];
    countries.forEach((country) => {
      const countryName = this.state.lang === "ko" ? country.ko : country.en;
      temp += `<li class="country-item" id="${country.alpha2}">
            <span class="checkbox"></span>
            <label>${countryName}</label>
          </li>`;
    });

    this.$target.innerHTML = `
        <div class="search-input-wrapper">
            <input type="text" class="search-input" placeholder="${
              this.state.lang === "ko"
                ? "나라명을 검색하세요"
                : "Search for a country"
            }" />
        </div>
        <div class="country-list-container hidden">
            <ul class="country-list">${temp}</ul>
        </div>
    `;

    // 검색 필터링
    const $searchInput = document.querySelector("input.search-input");

    $searchInput.addEventListener("input", () => {
      this.setState({ ...this.state, inputString: $searchInput.value });
    });

    // 나라 목록 display 여부
    this.$target.addEventListener("mouseenter", () => {
      document
        .querySelector("div.country-list-container")
        .classList.remove("hidden");
    });
    this.$target.addEventListener("mouseleave", () => {
      document
        .querySelector("div.country-list-container")
        .classList.add("hidden");
    });

    // 나라 선택/해제
    const $countryLists = document.querySelectorAll("li.country-item");
    $countryLists.forEach(($li) => {
      $li.addEventListener("click", () => {
        onCheck($li);
      });
    });
  };

  this.render = () => {
    // 입력창 placeholder
    const placeHolder =
      this.state.lang === "ko" ? "나라명을 검색하세요" : "Search for a country";
    this.$target
      .querySelector(".search-input")
      .setAttribute("placeholder", placeHolder);

    // 나라 목록
    let temp = [];
    countries.forEach((country) => {
      const countryName = this.state.lang === "ko" ? country.ko : country.en;

      const includes = countryName.includes(this.state.inputString); // 검색어 포함 여부
      const checked = this.state.selectedCountries.includes(country.alpha2); // 체크 여부

      temp += `<li class="country-item${!includes ? " hidden" : ""}" id="${
        country.alpha2
      }">
            <span class="checkbox ${checked ? "checked" : ""}"></span>
            <label>${countryName}</label>
          </li>`;
    });
    document.querySelector("ul.country-list").innerHTML = temp;

    // 나라 선택/해제
    const $countryLists = document.querySelectorAll("li.country-item");
    $countryLists.forEach(($li) => {
      $li.addEventListener("click", () => {
        onCheck($li);
      });
    });
  };

  this.init();
}
