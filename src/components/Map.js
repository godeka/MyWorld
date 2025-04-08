import mapboxgl from "mapbox-gl";

mapboxgl.accessToken =
  "pk.eyJ1IjoiZ29kZWthIiwiYSI6ImNtOG54azZpbzA1ZmMybG9qejJ1aTVyNDcifQ.5J3bnCVQntAWizBEqIqLYQ";

export default function Map({ $app, initialState, onClick }) {
  this.state = initialState;

  const $target = document.createElement("div");
  $target.id = "map";
  $app.appendChild($target);

  const map = new mapboxgl.Map({
    container: "map",
    center: [0, 0], // 경도, 위도
    zoom: 1.5,
    style: "mapbox://styles/mapbox/light-v11",
    projection: "equirectangular", // 직사각형 투영
  });

  let countriesGeoJSON;

  this.setState = (newState) => {
    this.state = newState;
    this.render();
  };

  this.render = () => {
    if (!countriesGeoJSON) return;

    // selected 여부 설정
    const features = countriesGeoJSON.features;

    features.forEach((country) => {
      const a2 = country.properties.ISO_A2.toLowerCase();
      const selected = this.state.includes(a2);

      map.setFeatureState(
        { source: "countries", id: country.id },
        { selected: selected }
      );
    });
  };

  this.init = () => {
    map.getCanvas().style.cursor = "default"; // 기본 커서로

    map.setRenderWorldCopies(false); // 루프 방지
    map.dragPan.disable(); // 드래그 방지
    map.dragRotate.disable(); // 드래그 회전 방지

    // 줌 제거
    map.scrollZoom.disable();
    map.boxZoom.disable();
    map.doubleClickZoom.disable();

    // 색칠 준비
    map.on("load", async () => {
      await fetch("./src/data/countries.geojson")
        .then((res) => res.json())
        .then((data) => {
          // console.log("GeoJSON loaded:", data);

          // 각 feature에 고유 ID 부여
          data.features.forEach((feature, index) => {
            feature.id = index; // 또는 feature.properties.ISO_A3 같은 걸로도 가능
          });

          countriesGeoJSON = data;
        });

      map.addSource("countries", {
        type: "geojson",
        data: countriesGeoJSON,
      });

      map.addLayer({
        id: "country-hovers",
        type: "fill",
        source: "countries",
        paint: {
          "fill-color": [
            "case",
            ["boolean", ["feature-state", "hover"], false],
            "rgb(84, 84, 84)", // hover=true인 나라의 색
            "rgba(0,0,0,0)", // hover=false인 나라의 색 (투명)
          ],
          "fill-opacity": 0.5,
        },
      });

      map.addLayer({
        id: "country-fills",
        type: "fill",
        source: "countries",
        paint: {
          "fill-color": [
            "case",
            ["boolean", ["feature-state", "selected"], false],
            "rgb(255, 94, 121)", // selected=true인 나라의 색
            "rgba(0,0,0,0)", // 기본 색 (투명)
          ],
          // "fill-opacity": 0.6,
        },
      });

      // map.addLayer({
      //   id: "country-borders",
      //   type: "line",
      //   source: "countries",
      //   layout: {},
      //   paint: {
      //     "line-color": "#fff",
      //     "line-width": 0,
      //   },
      // });

      // 나라명 등 라벨 레이어 맨 위로 올리기
      ["country-label", "state-label", "place-label"].forEach((layerId) => {
        if (map.getLayer(layerId)) {
          map.moveLayer(layerId);
          map.setLayoutProperty(layerId, "visibility", "visible");
        }
      });

      // 나라에 마우스오버 시 색칠
      let hoveredId = null;

      map.on("mousemove", "country-hovers", (e) => {
        const currentId = e.features[0].id;

        // 다른 나라로 마우스 이동
        if (hoveredId !== null && hoveredId !== currentId) {
          // 이전에 hover되었던 나라 초기화
          map.setFeatureState(
            { source: "countries", id: hoveredId },
            { hover: false }
          );
        }

        // 레이어 바깥에서 안으로 마우스 이동
        if (hoveredId !== currentId) {
          // 새로 hover된 나라에 hover 설정
          hoveredId = currentId;
          map.setFeatureState(
            { source: "countries", id: hoveredId },
            { hover: true }
          );
        }
      });

      map.on("mouseout", "country-hovers", () => {
        map.setFeatureState(
          { source: "countries", id: hoveredId },
          { hover: false }
        );
      });

      // 나라 클릭하여 선택/해제
      map.on("click", "country-fills", (e) => {
        const country = e.features[0];
        const a2 = country.properties.ISO_A2.toLowerCase();

        const { selected } = map.getFeatureState({
          source: "countries",
          id: country.id,
        });

        map.setFeatureState(
          { source: "countries", id: country.id },
          { selected: !selected }
        );

        // setState
        onClick(!selected, a2);
      });
    });
  };

  this.init();
}
