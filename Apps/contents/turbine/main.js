// Cesiumのグローバルオブジェクトにアクセスできるようにする
// Sandcastle-header.js や load-cesium-es6.js の代わりに Cesium.js を直接読み込む場合は、
// その読み込み方法によって 'Cesium' オブジェクトへのアクセス方法が変わります。
// 例: import * as Cesium from '../../../Cesium_template/Build/Cesium/Cesium.js';
// または、window.Cesium が利用可能であればそのまま使用します。

(function () {
    "use strict";
    const date = new Date()
    var MM = ("0" + (date.getMonth() + 1)).slice(-2)
    var DD = ("0" + date.getDate()).slice(-2)
    var hh = ("0" + date.getHours()).slice(-2)
    var mm = ("0" + date.getMinutes()).slice(-2)
    var ss = ("0" + date.getSeconds()).slice(-2)
    var setTime = date.getFullYear() + '-' + MM + '-' + DD + 'T' + hh + ':' + mm + ':' + ss + 'TAI';


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
    });

    viewer.scene.globe.enableLighting = true;


    // knockout
    // set default value
    var viewModel = {
      height: 0,
    };

    Cesium.knockout.track(viewModel);
    var toolbar = document.getElementById("toolbar");
    Cesium.knockout.applyBindings(viewModel, toolbar);

    Cesium.knockout
      .getObservable(viewModel, "height")
      .subscribe(function (height) {
        height = Number(height);
        if (isNaN(height)) {
          return;
        }
        /// change heading realtime
      });





    Sandcastle.addToolbarMenu(
      [
        {
          text: "地形表現なし",
          onselect: function () {
            viewer.terrainProvider = new Cesium.EllipsoidTerrainProvider();
          },
        },
        {
          text: "地形表現あり",
          onselect: function () {
            viewer.scene.setTerrain(Cesium.Terrain.fromWorldTerrain());
          },
        },
      ],
      "terrainMenu"
    );



    var materialOptions = [
      {
        text: "風車2MW",
        onselect: function () {
          objName = "風車2MW"
          modelurl = "windturbine_2MW.glb";
          viewer.canvas.removeEventListener('contextmenu', setModel, false);
          viewer.canvas.addEventListener('contextmenu', setModel, false);
        },
      },
      {
        text: "風車5MW",
        onselect: function () {
          objName = "風車5MW"
          modelurl = "windturbine_5MW.glb";
          viewer.canvas.removeEventListener('contextmenu', setModel, false);
          viewer.canvas.addEventListener('contextmenu', setModel, false);
        },
      },
    ];

    Sandcastle.addToolbarMenu(materialOptions);

    Sandcastle.addToggleButton("Shadow", viewer.shadows, function (
      checked
    ) {
      viewer.shadows = checked;
    });


    //  右クリックの設定
    var setModel = function (e) {
      var mousePosition = new Cesium.Cartesian2(e.clientX, e.clientY);
      var modelContents = modelurl;
      var ellipsoid = viewer.scene.globe.ellipsoid;
      var cartesian = viewer.camera.pickEllipsoid(mousePosition, ellipsoid);
      if (e.ctrlKey == false && e.shiftKey == false) {
        if (cartesian) {
          var cartographic = ellipsoid.cartesianToCartographic(cartesian);
          var longitudeString = Cesium.Math.toDegrees(cartographic.longitude).toFixed(20);
          var latitudeString = Cesium.Math.toDegrees(cartographic.latitude).toFixed(20);

          //      alert(longitudeString + ', ' + latitudeString);

          // 右クリック時の処理　風車の設置    
          var heading = Cesium.Math.toRadians(Number(viewModel.height) - 90);
          var pitch = Cesium.Math.toRadians(0);
          var roll = Cesium.Math.toRadians(0);
          var hpr = new Cesium.HeadingPitchRoll(heading, pitch, roll);


          var position = Cesium.Cartesian3.fromDegrees(parseFloat(longitudeString), parseFloat(latitudeString), 0);

          var entity = viewer.entities.add({
            //name: longitudeString + ', ' + latitudeString,
            name: objName,
            position: position,
            orientation: Cesium.Transforms.headingPitchRollQuaternion(
              position,
              hpr
            ),
            model: {
              uri: modelContents,
              heightReference: Cesium.HeightReference.CLAMP_TO_GROUND,
              minimumPixelSize: 50,
              maximumScale: 200,
              scale: 1,
              runAnimations: true,
            },
          });

        } else {
          alert('ここには建てられないよ');
        }
      }
      if (e.shiftKey == true) {
        //削除機能
        var cartographic = ellipsoid.cartesianToCartographic(cartesian);
        var longitudeString = Cesium.Math.toDegrees(cartographic.longitude).toFixed(5);
        var latitudeString = Cesium.Math.toDegrees(cartographic.latitude).toFixed(5);
        var position = Cesium.Cartesian3.fromDegrees(parseFloat(longitudeString), parseFloat(latitudeString), 0);
        //console.log(latitudeString);
        //console.log(entity.length);

        //viewer.entities.remove(polylineEntity);
      }
    };


    //初期オブジェクト
    var modelurl = "windturbine_2MW.glb";
    var objName = "風車2MW"
    viewer.canvas.addEventListener('contextmenu', setModel, false);

    //　初期のカメラ
    var frontView = {
      destination: new Cesium.Cartesian3.fromDegrees(
        135.5000, 34.00, 2000000
      ),
      orientation: {
        heading: Cesium.Math.toRadians(0),
        pitch: Cesium.Math.toRadians(-80),
        roll: Cesium.Math.toRadians(0),
      },
      maximumHeight: 100,
    };


    viewer.scene.camera.setView({
      destination: frontView.destination,
      orientation: frontView.orientation,
    });


    //Sandcastle_End
    Sandcastle.finishedLoading();
  })();