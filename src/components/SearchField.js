import countries_ko from "../data/countries_ko.json";

export default function SearchField({ $app, initialState }) {
  this.state = initialState;
  this.$target = document.createElement("div");
  this.$target.className = "search-container";

  $app.appendChild(this.$target);

  this.setState = (newState) => {
    this.state = newState;
    this.render();
  };

  this.template = () => {
    let temp = [];
    countries_ko.forEach((country) => {
      temp += `<li class="country-item">
            <input type="checkbox" name="country" />
            <label>${country.name}</label>
          </li>`;
    });

    return `
        <input type="text" class="search-country" placeholder="나라명을 검색하세요" />
        <div class="select-container hidden">
            <ul class="select-list">${temp}</ul>
        </div>
    `;
  };

  this.render = () => {
    this.$target.innerHTML = this.template();

    // 검색 필터링
    const $searchInput = document.querySelector("input.search-country");

    $searchInput.addEventListener("input", () => {
      const $listItems = document.querySelectorAll("li.country-item");

      $listItems.forEach(($item) => {
        const countryName = $item.lastElementChild.innerHTML;
        if (!countryName.includes($searchInput.value))
          $item.classList.add("hidden");
        else $item.classList.remove("hidden");
      });
    });

    // 나라 목록 display 여부
    this.$target.addEventListener("mouseenter", () => {
      document.querySelector("div.select-container").classList.remove("hidden");
    });
    this.$target.addEventListener("mouseleave", () => {
      document.querySelector("div.select-container").classList.add("hidden");
    });
  };

  this.render();
}
