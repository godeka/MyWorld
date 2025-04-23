// 가본 나라 퍼센테이지, 개수 표시하는 필드
export default function InfoField({ $app, initialState }) {
  this.state = initialState; // 선택된 나라의 alpha2 목록
  this.$target = document.createElement("div");
  this.$target.className = "info-container";

  $app.appendChild(this.$target);

  this.setState = (newState) => {
    this.state = newState;
    this.render();
  };

  this.render = () => {
    const $info = document.querySelector(".info-container");
    $info.textContent = `당신이 가본 나라는 전 세계의 ${
      Math.round((this.state.length / 249) * 100 * 100) / 100
    }% (${this.state.length}/249) 입니다.`;
  };

  this.render();
}
