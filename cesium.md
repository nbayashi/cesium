## viewer

- 3D
var viewer = new Cesium.Viewer('cesiumContainer', {
    shouldAnimate : true
});


- 地図を２。５Dにする
var viewer = new Cesium.Viewer('cesiumContainer', { sceneMode : Cesium.SceneMode.SCENE2D });

- 地図のリセット
viewer.dataSources.removeAll();


## viewer.zoomTo,flyTo
- エンティティにズーム
viewer.flyTo(dataSource);

- by coordinate

var center = Cesium.Cartesian3.fromDegrees(-82.5, 135.3);
viewer.camera.lookAt(center, new Cesium.Cartesian3(0.0, 0.0, 42.0));

----
    viewer.camera.setView({
        destination : Cesium.Cartesian3.fromDegrees(
            80,
            80,
            Cesium.Ellipsoid.WGS84.cartesianToCartographic(viewer.camera.position).height
        )
    });
----

var center = Cesium.Cartesian3.fromDegrees(137.825362273258, 31.2765107698755);
var heading = Cesium.Math.toRadians(90);
var pitch = Cesium.Math.toRadians(30);
var range = 30000000;
viewer.camera.lookAt(center,new Cesium.HeadingPitchRange(heading, pitch, range));

----


viewer.camera.flyTo({ destination: Cesium.Cartesian3. fromDegrees(141.3860555, 43.056222, 1000) ↑ ↑ ↑ }); 
----




## toolbar

  <div style="position: absolute;top: 20px;left: 20px;">
    <button id ="id" type ="bottun" class ="cesium-bottun">世界の状況</button> 
</div>

document.getElementById("id").addEventListener("click",function () {

    
var dataSourcePromise = Cesium.CzmlDataSource.load(czml_eachday);
viewer.dataSources.add(dataSourcePromise);
viewer.zoomTo(dataSourcePromise);

});

{
    viewer.zoomTo(redRectangle, new Cesium.HeadingPitchRange(Math.PI / 2, -Math.PI / 4, 4000000));
}


add Gltf
----------

var viewer = new Cesium.Viewer('cesiumContainer');
 var imageProvider = new Cesium.UrlTemplateImageryProvider({ url: '//cyberjapandata.gsi.go.jp/xyz/ort/{z}/{x}/{y}.jpg', maximumLevel : 18 }); 
 var current_image = viewer.scene.imageryLayers.addImageryProvider(imageProvider); 
 var modelMatrix = Cesium.Transforms.eastNorthUpToFixedFrame( Cesium.Cartesian3.fromDegrees(141.3860555, 43.056222, 500.0)); 
 var model = viewer.scene.primitives.add(Cesium.Model.fromGltf({ url : 'turbine.gltf', modelMatrix : modelMatrix, scale : 50.0 })); viewer.camera.flyTo({ destination: Cesium.Cartesian3.fromDegrees(141.3860555, 43.056222, 5000) });

 ----------

var localFrames = [
    {
      pos: Cesium.Cartesian3.fromDegrees(131.255035,32.621449,0),
      converter: Cesium.Transforms.eastNorthUpToFixedFrame,
      comments: "T1",
    },
    {
      pos: Cesium.Cartesian3.fromDegrees(131.252632,32.616099,0),
      converter: Cesium.Transforms.eastNorthUpToFixedFrame,
      comments: "T2",
    },
    {
      pos: Cesium.Cartesian3.fromDegrees(131.253319,32.609881,0.0),
      converter: Cesium.Transforms.eastNorthUpToFixedFrame,
      comments: "T3",
    },
    {
      pos: Cesium.Cartesian3.fromDegrees(131.247654,32.602362,0.0),
      converter: Cesium.Transforms.eastNorthUpToFixedFrame,
      comments: "T4",
    },
    {
      pos: Cesium.Cartesian3.fromDegrees(131.237612,32.593684,0.0),
      converter: Cesium.Transforms.eastNorthUpToFixedFrame,
      comments: "T5",
    },
  ];
  
  var primitives = [];
  var hprRollZero = new Cesium.HeadingPitchRoll();
  var hpRoll = new Cesium.HeadingPitchRoll();


viewer.scene.preUpdate.addEventListener(function (scene, time) {
  for (var i = 0; i < localFrames.length; i++) {
    var position = localFrames[i].pos;
    var converter = localFrames[i].converter;
    var comments = localFrames[i].comments;
    var planePrimitive = scene.primitives.add(
      Cesium.Model.fromGltf({
        url: "https://nbayashi.github.io/cesium_3d/Source/windturbine.gltf",
        modelMatrix: Cesium.Transforms.eastNorthUpToFixedFrame(
          position
        ),
        scale:1.0
      })
    );

  }
})

 ------



var position = new Cesium.Cartesian3(
  -1371108.6511167218,
  -5508684.080096612,
  2901825.449865087
);
var heading = Cesium.Math.toRadians(180);
var pitch = Cesium.Math.toRadians(2);
var roll = Cesium.Math.toRadians(-6);
var hpr = new Cesium.HeadingPitchRoll(heading, pitch, roll);
var orientation = Cesium.Transforms.headingPitchRollQuaternion(
  position,
  hpr
);

var entity = viewer.entities.add({
  name: "truck",
  position: position,
  orientation: orientation,
  model: {
    uri: "../SampleData/models/GroundVehicle/GroundVehicle.glb",
    heightReference: Cesium.HeightReference.CLAMP_TO_GROUND,
    minimumPixelSize: 128,
    maximumScale: 20,
    scale: 8.0,
    runAnimations: false,
  },
});



 
## clock
var clock = new Cesium.Clock({
  startTime: Cesium.JulianDate.fromIso8601("2017-07-11T00:00:00Z"),
  stopTime: Cesium.JulianDate.fromIso8601("2017-07-11T24:00:00Z"),
  currentTime: Cesium.JulianDate.fromIso8601("2017-07-11T10:00:00Z"),
  clockRange: Cesium.ClockRange.LOOP_STOP,
  clockStep: Cesium.ClockStep.SYSTEM_CLOCK_MULTIPLIER,
  multiplier: 1000,
  shouldAnimate: true,
});


