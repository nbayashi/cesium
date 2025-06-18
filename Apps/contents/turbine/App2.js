(function () {
  "use strict";

  // 定数定義
  const WIND_TURBINE_2MW_MODEL = "windturbine_2MW.glb";
  const WIND_TURBINE_5MW_MODEL = "windturbine_5MW.glb";
  const MODEL_MIN_PIXEL_SIZE = 50;
  const MODEL_MAX_SCALE = 200;
  const INITIAL_CAMERA_LONGITUDE = 135.5000;
  const INITIAL_CAMERA_LATITUDE = 34.00;
  const INITIAL_CAMERA_HEIGHT = 2000000;
  const INITIAL_CAMERA_PITCH = -80; // Degrees
  const PLACEMENT_ERROR_MESSAGE = 'ここには建てられないよ';

  // Viewerの初期化
  var clock = new Cesium.Clock({
    //startTime: Cesium.JulianDate.fromIso8601("2020-01-01T00:00:00Z"),
    //stopTime: Cesium.JulianDate.fromIso8601("2020-12-31T24:00:00Z"),
    //currentTime: Cesium.JulianDate.fromIso8601(setTime),
    //clockRange: Cesium.ClockRange.LOOP_STOP,
    //clockStep: Cesium.ClockStep.SYSTEM_CLOCK_MULTIPLIER,
    multiplier: 1,
    shouldAnimate: true,
  });

  var viewer = new Cesium.Viewer("cesiumContainer", {
    clockViewModel: new Cesium.ClockViewModel(clock),
    selectionIndicator: true,
    terrainProvider: new Cesium.EllipsoidTerrainProvider(),
    vrButton: true, //VRボタン有効化,
    terrain: Cesium.Terrain.fromWorldTerrain({
requestWaterMask: true,
requestVertexNormals: true,
}),
    vrButton: true, //VRボタン有効化
  });

  viewer.scene.globe.enableLighting = true;

  // knockout ViewModelの初期化
  const viewModel = {
      height: 0, // headingとして使用
  };
  Cesium.knockout.track(viewModel);
  const toolbar = document.getElementById("toolbar");
  if (toolbar) {
      Cesium.knockout.applyBindings(viewModel, toolbar);
  } else {
      console.error("Error: #toolbar element not found. Knockout bindings might not be applied correctly.");
  }

  // Headingの変化を監視
  Cesium.knockout
      .getObservable(viewModel, "height")
      .subscribe(function (height) {
          const parsedHeight = Number(height);
          if (isNaN(parsedHeight)) {
              return;
          }
          // 必要に応じてリアルタイムで風車の向きを変更するロジックを追加
      });

  // --- 地形表現プルダウンのイベントハンドラ ---
  const terrainSelect = document.getElementById("terrainSelect");
  if (terrainSelect) {
      terrainSelect.addEventListener('change', function() {
          const selectedValue = this.value;
          if (selectedValue === "none") {
              viewer.terrainProvider = new Cesium.EllipsoidTerrainProvider();
          } else if (selectedValue === "world") {
              viewer.scene.setTerrain(Cesium.Terrain.fromWorldTerrain({
                  requestWaterMask: true,
                  requestVertexNormals: true,
              }));
          }
      });
  }

  // 現在選択されているモデルの情報
  let currentModel = {
      name: "風車2MW",
      url: WIND_TURBINE_2MW_MODEL,
  };

  // --- モデル選択プルダウンのイベントハンドラ ---
  const modelSelect = document.getElementById("modelSelect");
  if (modelSelect) {
      modelSelect.addEventListener('change', function() {
          const selectedValue = this.value;
          if (selectedValue === "2MW") {
              currentModel = {
                  name: "風車2MW",
                  url: WIND_TURBINE_2MW_MODEL
              };
          } else if (selectedValue === "5MW") {
              currentModel = {
                  name: "風車5MW",
                  url: WIND_TURBINE_5MW_MODEL
              };
          }
          console.log(`Selected model: ${currentModel.name}`);
      });
  }

  // --- シャドウ切り替えチェックボックスのイベントハンドラ ---
  const shadowToggle = document.getElementById("shadowToggle");
  if (shadowToggle) {
      shadowToggle.checked = viewer.shadows;
      shadowToggle.addEventListener('change', function() {
          viewer.shadows = this.checked;
          console.log(`Shadows: ${viewer.shadows ? 'ON' : 'OFF'}`);
      });
  }

  // --- 風車設置モードの管理 ---
  let isPlacementModeActive = false; // 設置モードがオンかどうか
  const togglePlacementModeButton = document.getElementById("togglePlacementMode");
  
  if (togglePlacementModeButton) {
      togglePlacementModeButton.addEventListener('click', function() {
          isPlacementModeActive = !isPlacementModeActive; // 状態を切り替える
          if (isPlacementModeActive) {
              this.textContent = "風車設置モード: ON";
              this.classList.remove("off");
              this.classList.add("on");
              viewer.canvas.style.cursor = "crosshair"; // カーソルを十字に変える
              console.log("Placement mode ON");
          } else {
              this.textContent = "風車設置モード: OFF";
              this.classList.remove("on");
              this.classList.add("off");
              viewer.canvas.style.cursor = "default"; // カーソルをデフォルトに戻す
              console.log("Placement mode OFF");
          }
      });
  }

  /**
   * モデルを設置または削除するイベントハンドラ（左クリック）
   * @param {Event} click - Cesium.ScreenSpaceEventHandlerのクリックイベントオブジェクト
   */
  const handler = new Cesium.ScreenSpaceEventHandler(viewer.canvas);

  handler.setInputAction(function (click) {
      // 設置モードがオフの場合は何もしない
      if (!isPlacementModeActive) {
          return;
      }

      const mousePosition = click.position; // クリックされた画面座標
      
      // Shiftキーが押されている場合は削除機能
      if (viewer.scene.pick(mousePosition) && (click.keyboardModifier & Cesium.KeyboardEventModifier.SHIFT)) {
          const pickedObject = viewer.scene.pick(mousePosition);
          if (Cesium.defined(pickedObject) && Cesium.defined(pickedObject.id)) {
              viewer.entities.remove(pickedObject.id);
              console.log(`Removed entity: ${pickedObject.id.name || pickedObject.id.id}`);
          } else {
              console.log("No entity found to remove at this location.");
          }
      }
      // 設置モードがオンで、Shiftキーが押されていない場合にモデルを設置
      else {
          // **常に地形上の位置をピッキングする** (地形がオフの場合は楕円体)
          const ray = viewer.camera.getPickRay(mousePosition);
          const cartesianPosition = viewer.scene.globe.pick(ray, viewer.scene);

          if (Cesium.defined(cartesianPosition)) { // ピックされた位置が存在する場合
              const cartographicPosition = Cesium.Cartographic.fromCartesian(cartesianPosition);
              const longitude = Cesium.Math.toDegrees(cartographicPosition.longitude);
              const latitude = Cesium.Math.toDegrees(cartographicPosition.latitude);
              // ピックした地点の標高を取得 (地形なしの場合は0、地形ありの場合は地形の高さ)
              const height = cartographicPosition.height; 

              const heading = Cesium.Math.toRadians(Number(viewModel.height) - 90);
              const pitch = Cesium.Math.toRadians(0);
              const roll = Cesium.Math.toRadians(0);
              const hpr = new Cesium.HeadingPitchRoll(heading, pitch, roll);

              viewer.entities.add({
                  name: currentModel.name,
                  // 常に標高0の座標をpositionとし、高さの基準をCLAMP_TO_GROUNDにする
                  position: Cesium.Cartesian3.fromDegrees(longitude, latitude, 0), 
                  orientation: Cesium.Transforms.headingPitchRollQuaternion(
                      Cesium.Cartesian3.fromDegrees(longitude, latitude, 0), // orientationの基準位置も標高0
                      hpr
                  ),
                  model: {
                      uri: currentModel.url,
                      heightReference: Cesium.HeightReference.CLAMP_TO_GROUND, // ここをCLAMP_TO_GROUNDに固定
                      minimumPixelSize: MODEL_MIN_PIXEL_SIZE,
                      maximumScale: MODEL_MAX_SCALE,
                      scale: 1,
                      runAnimations: true,
                  },
              });
          } else {
              alert(PLACEMENT_ERROR_MESSAGE); // ピックできなかった場合
          }
      }
  }, Cesium.ScreenSpaceEventType.LEFT_CLICK);

  // 初期カメラ位置の設定
  const initialCameraView = {
      destination: new Cesium.Cartesian3.fromDegrees(
          INITIAL_CAMERA_LONGITUDE,
          INITIAL_CAMERA_LATITUDE,
          INITIAL_CAMERA_HEIGHT
      ),
      orientation: {
          heading: Cesium.Math.toRadians(0),
          pitch: Cesium.Math.toRadians(INITIAL_CAMERA_PITCH),
          roll: Cesium.Math.toRadians(0),
      },
  };

  viewer.scene.camera.setView({
      destination: initialCameraView.destination,
      orientation: initialCameraView.orientation,
  });

  // ローディングオーバーレイを非表示にする
  const loadingOverlay = document.getElementById("loadingOverlay");
  if (loadingOverlay) {
      loadingOverlay.style.display = "none";
  }

})();