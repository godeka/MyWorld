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
            ${this.state.lang === "ko" ? "리셋하기" : "Reset"}
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
    this.$target.querySelector(".reset-button").textContent =
      this.state.lang === "ko" ? "리셋하기" : "Reset";

    this.$target.querySelector(".save-button").textContent =
      this.state.lang === "ko" ? "이미지로 저장" : "Save as Image";
  };

  this.init();
}
