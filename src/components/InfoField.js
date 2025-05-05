// 가본 나라 퍼센테이지, 개수 표시하는 필드
export default function InfoField({ $app, initialState }) {
  this.state = initialState; // { lang: "ko", selectedCountries: [] }
  this.$target = document.createElement("div");
  this.$target.className = "info-container";

  $app.appendChild(this.$target);

  this.setState = (newState) => {
    this.state = newState;
    this.render();
  };

  this.render = () => {
    const numVisited = this.state.selectedCountries.length;
    const percentage = Math.round((numVisited / 249) * 100 * 100) / 100;
    const $info = document.querySelector(".info-container");
    $info.textContent =
      this.state.lang === "ko"
        ? `당신이 가본 나라는 전 세계의 ${percentage}% (${numVisited}/249) 입니다.`
        : `You've visited ${percentage}% (${numVisited}/249) of the countries in the world.`;
  };

  this.render();
}
