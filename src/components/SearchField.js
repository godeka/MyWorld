export default function SearchField({
  $app,
  countries_ko,
  initialState,
  onCheck,
}) {
  this.state = initialState;
  this.$target = document.createElement("div");
  this.$target.className = "search-container";

  $app.appendChild(this.$target);

  this.setState = (newState) => {
    this.state = newState;
    this.render();
  };

  this.init = () => {
    let temp = [];
    countries_ko.forEach((country) => {
      temp += `<li class="country-item">
            <input type="checkbox" name="country" id="${country.alpha2}" />
            <label>${country.name}</label>
          </li>`;
    });

    this.$target.innerHTML = `
        <input type="text" class="search-country" placeholder="나라명을 검색하세요" />
        <div class="select-container hidden">
            <ul class="select-list">${temp}</ul>
        </div>
    `;

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

    // 나라 선택
    const $checkboxes = document.querySelectorAll("input[name='country']");
    $checkboxes.forEach(($checkbox) => {
      $checkbox.addEventListener("change", () => {
        onCheck($checkbox);
      });
    });
  };

  this.render = () => {
    // 나라 목록만 리렌더링
    let temp = [];
    countries_ko.forEach((country) => {
      const checked = this.state.includes(country.alpha2);
      temp += `<li class="country-item">
            <input type="checkbox" name="country" id="${country.alpha2}" ${
        checked ? "checked" : ""
      } />
            <label>${country.name}</label>
          </li>`;
    });
    document.querySelector("ul.select-list").innerHTML = temp;

    // 나라 선택
    const $checkboxes = document.querySelectorAll("input[name='country']");
    $checkboxes.forEach(($checkbox) => {
      $checkbox.addEventListener("change", () => {
        onCheck($checkbox);
      });
    });
  };

  this.init();
}
