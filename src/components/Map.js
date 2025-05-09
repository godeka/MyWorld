import mapboxgl from "mapbox-gl";
import html2canvas from "html2canvas";

mapboxgl.accessToken =
  "pk.eyJ1IjoiZ29kZWthIiwiYSI6ImNtOG54azZpbzA1ZmMybG9qejJ1aTVyNDcifQ.5J3bnCVQntAWizBEqIqLYQ";

export default function Map({ $app, countries, initialState, onClick }) {
  this.state = initialState;

  this.$target = document.createElement("div");
  this.$target.id = "map";
  $app.appendChild(this.$target);

  const map = new mapboxgl.Map({
    container: "map",
    center: [0, 0], // 경도, 위도
    zoom: 1.5,
    style: {
      version: 8,
      sources: {},
      layers: [],
    },
    projection: "equirectangular", // 직사각형 투영
    preserveDrawingBuffer: true, // 이미지 저장을 위함
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
      const selected = this.state.selectedCountries.includes(a2);

      map.setFeatureState(
        { source: "countries", id: country.id },
        { selected: selected }
      );
    });

    // 이미지 저장 버튼 글씨
    $app.querySelector(".save-button").textContent =
      this.state.lang === "ko" ? "이미지로 저장" : "Save as Image";
  };

  this.init = () => {
    const $tooltip = document.createElement("div");
    $tooltip.className = "country-tooltip";
    $tooltip.style.display = "none";
    this.$target.appendChild($tooltip);

    map.getCanvas().style.cursor = "default"; // 기본 커서로

    map.setRenderWorldCopies(false); // 루프 방지
    map.dragPan.disable(); // 드래그 방지
    map.dragRotate.disable(); // 드래그 회전 방지

    // 줌 제거
    map.scrollZoom.disable();
    map.boxZoom.disable();
    map.doubleClickZoom.disable();

    // 지도 그리기
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
            "rgb(0, 0, 0)", // hover=true인 나라의 색
            "#fff", // hover=false인 나라의 색
          ],
          "fill-opacity": 0.6,
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
            "rgba(141, 141, 141, 0.6)", // 기본 색 (투명)
          ],
          // "fill-opacity": 0.6,
        },
      });

      map.addLayer({
        id: "country-borders",
        type: "line",
        source: "countries",
        paint: {
          "line-color": "#000",
          "line-width": 0.7,
        },
      });

      // 나라명 등 라벨 레이어 맨 위로 올리기
      ["country-label", "state-label", "place-label"].forEach((layerId) => {
        if (map.getLayer(layerId)) {
          map.moveLayer(layerId);
          map.setLayoutProperty(layerId, "visibility", "visible");
        }
      });

      // 리셋 버튼, 이미지 저장 버튼 활성화
      const $mapTools = document.querySelector(".map-tools");
      $mapTools.classList.remove("hidden");

      // interactions

      // 나라에 마우스오버 시 색칠 & 툴팁 띄우기
      let hoveredId = null;

      map.on("mousemove", "country-hovers", (e) => {
        const currentId = e.features[0].id;
        const countryA2 = e.features[0].properties.ISO_A2.toLowerCase();

        // 다른 나라로 마우스 이동
        if (hoveredId !== null && hoveredId !== currentId) {
          // 이전에 hover되었던 나라 초기화
          map.setFeatureState(
            { source: "countries", id: hoveredId },
            { hover: false }
          );
        }

        if (hoveredId !== currentId) {
          // 새로 hover된 나라에 hover 설정
          hoveredId = currentId;
          map.setFeatureState(
            { source: "countries", id: hoveredId },
            { hover: true }
          );
        }
        const sameCountry = countries.filter((c) => c.alpha2 === countryA2)[0];
        let countryName;
        if (sameCountry)
          countryName =
            this.state.lang == "ko" ? sameCountry.ko : sameCountry.en;
        else countryName = "-";

        $tooltip.style.display = "block";
        $tooltip.innerText = countryName;
        $tooltip.style.top = e.originalEvent.pageY + "px";
        $tooltip.style.left = e.originalEvent.pageX + "px";
      });

      // 마우스가 나라 위에서 바다로 나갈 때
      map.on("mouseout", "country-hovers", () => {
        map.setFeatureState(
          { source: "countries", id: hoveredId },
          { hover: false }
        );
        hoveredId = null;

        $tooltip.style.display = "none";
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

      // 이미지로 저장
      const $saveButton = $mapTools.querySelector(".save-button");
      $saveButton.addEventListener("click", function () {
        // 지도가 완전히 렌더링된 후 캡처
        map.once("idle", function () {
          setTimeout(function () {
            html2canvas($app, {
              scale: 2, // 고해상도 출력
            })
              .then(function (canvas) {
                const link = document.createElement("a");
                link.href = canvas.toDataURL("image/png");
                link.download = "my_world.png";
                link.click();
              })
              .catch(function (error) {
                console.error("지도 이미지 생성 오류:", error);
                alert("지도 저장에 실패했습니다.");
              });
          }, 500);
        });
        map.triggerRepaint();
      });
    });
  };

  this.init();
}
