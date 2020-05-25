
var clock = new Cesium.Clock({
  startTime: Cesium.JulianDate.fromIso8601("2020-01-01T00:00:00Z"),
  stopTime: Cesium.JulianDate.fromIso8601("2020-12-31T24:00:00Z"),
  currentTime: Cesium.JulianDate.fromIso8601("2020-01-01T00:00:00Z"),
  clockRange: Cesium.ClockRange.LOOP_STOP,
  clockStep: Cesium.ClockStep.SYSTEM_CLOCK_MULTIPLIER,
  multiplier: 1,
  shouldAnimate: true,
});

var viewer = new Cesium.Viewer("cesiumContainer", {
    clockViewModel: new Cesium.ClockViewModel(clock),
    selectionIndicator: true,
   // terrainProvider: Cesium.createWorldTerrain(),
  });
  
    viewer.scene.globe.enableLighting = true;
    viewer.shadows = true;

    

//  右クリックの設定
viewer.canvas.addEventListener('contextmenu', function(e){
    var mousePosition = new Cesium.Cartesian2(e.clientX, e.clientY);

    var ellipsoid = viewer.scene.globe.ellipsoid;
    var cartesian = viewer.camera.pickEllipsoid(mousePosition, ellipsoid);
    if (cartesian) {
        var cartographic = ellipsoid.cartesianToCartographic(cartesian);
        var longitudeString = Cesium.Math.toDegrees(cartographic.longitude).toFixed(20);
        var latitudeString = Cesium.Math.toDegrees(cartographic.latitude).toFixed(20);

  //      alert(longitudeString + ', ' + latitudeString);
      
  // 右クリック時の処理　風車の設置    
    var heading = Cesium.Math.toRadians(90);
    var pitch = Cesium.Math.toRadians(0);
    var roll = Cesium.Math.toRadians(0);
    var hpr = new Cesium.HeadingPitchRoll(heading, pitch, roll);


    var position =Cesium.Cartesian3.fromDegrees(parseFloat(longitudeString),parseFloat(latitudeString),0);
    var entity = viewer.entities.add({
      //name: longitudeString + ', ' + latitudeString,
      position:position,
      orientation:Cesium.Transforms.headingPitchRollQuaternion(
      position,
      hpr
      ),
      model:{
        uri:"https://nbayashi.github.io/cesium-3D/turbine/windturbine.glb",
        heightReference: Cesium.HeightReference.CLAMP_TO_GROUND,
        minimumPixelSize: 50,
        maximumScale:200,
        scale:0.3,
        runAnimations:true,
      },
    });

      
    } else {
        alert('ここには建てられないよ');
    }
	
}, false);




//　初期のカメラ
var frontView = {
  destination: new Cesium.Cartesian3.fromDegrees(
    135.0000,34.500,10000
  ),
  orientation: {
    heading: Cesium.Math.toRadians(0),
    pitch: Cesium.Math.toRadians(-30),
    roll: Cesium.Math.toRadians(0),
  },
  maximumHeight: 100,
};


viewer.scene.camera.setView({
  destination: frontView.destination,
  orientation: frontView.orientation,
});

