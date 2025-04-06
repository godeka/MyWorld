import mapboxgl from "mapbox-gl";

export default function Map({ $app, initialState }) {
  this.state = initialState;

  this.setState = (newState) => {
    this.state = newState;
    this.render();
  };

  this.render = () => {
    const $target = document.createElement("div");
    $target.id = "map";
    $app.appendChild($target);
  };

  this.init = () => {
    this.render();

    mapboxgl.accessToken =
      "pk.eyJ1IjoiZ29kZWthIiwiYSI6ImNtOG54azZpbzA1ZmMybG9qejJ1aTVyNDcifQ.5J3bnCVQntAWizBEqIqLYQ";

    const map = new mapboxgl.Map({
      container: "map",
      center: [0, 0], // 경도, 위도
      zoom: 1.5,
      style: "mapbox://styles/mapbox/light-v11",
      projection: "equirectangular", // 직사각형 투영
    });
    map.setRenderWorldCopies(false); // 루프 방지
    map.dragPan.disable(); // 드래그 방지

    // 줌 제거
    map.scrollZoom.disable();
    map.boxZoom.disable();
    map.doubleClickZoom.disable();
  };

  this.init();
}
