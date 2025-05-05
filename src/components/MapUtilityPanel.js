export default function MapUtilityPanel({ $app, initialState, onClickReset }) {
  this.state = initialState; // { lang: "ko", selectedCountries: [] }

  this.$target = document.createElement("div");
  this.$target.className = "map-tools hidden";
  $app.appendChild(this.$target);

  this.setState = (newState) => {
    this.state = newState;
    this.render();
  };

  this.init = () => {
    // 리셋 버튼
    const resetButton = `
        <button class="reset-button">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"></path>
                <path d="M3 3v5h5"></path>
            </svg>
            <span>${this.state.lang === "ko" ? "초기화" : "Reset"}<span>
        </button>
    `;

    // 이미지로 저장하기 버튼
    const saveButton = `
        <button class="save-button">
            ${this.state.lang === "ko" ? "이미지로 저장" : "Save as Image"}
        </button>
    `;

    this.$target.innerHTML = resetButton + saveButton;

    this.$target
      .querySelector(".reset-button")
      .addEventListener("click", onClickReset);
  };

  this.render = () => {
    this.$target.querySelector(".reset-button span").textContent =
      this.state.lang === "ko" ? "리셋하기" : "Reset";

    this.$target.querySelector(".save-button").textContent =
      this.state.lang === "ko" ? "이미지로 저장" : "Save as Image";
  };

  this.init();
}
