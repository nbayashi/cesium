

var clock = new Cesium.Clock({
  startTime: Cesium.JulianDate.fromIso8601("2017-07-11T00:00:00Z"),
  stopTime: Cesium.JulianDate.fromIso8601("2017-07-11T24:00:00Z"),
  currentTime: Cesium.JulianDate.fromIso8601("2017-07-11T10:00:00Z"),
  clockRange: Cesium.ClockRange.LOOP_STOP,
  clockStep: Cesium.ClockStep.SYSTEM_CLOCK_MULTIPLIER,
  multiplier: 1000,
  shouldAnimate: true,
});

var viewer = new Cesium.Viewer("cesiumContainer", {
//  clockViewModel: new Cesium.ClockViewModel(clock),
  selectionIndicator: false,
  terrainProvider: Cesium.createWorldTerrain(),
});


  viewer.shadows = true;


viewer.scene.globe.enableLighting = true;
viewer.scene.globe.depthTestAgainstTerrain = true;


var positions = [
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


var heading = Cesium.Math.toRadians(0);
var pitch = Cesium.Math.toRadians(0);
var roll = Cesium.Math.toRadians(0);
var hpr = new Cesium.HeadingPitchRoll(heading, pitch, roll);


  for (var i = 0; i < positions.length; i++) {
    var name = positions[i].comments;
    var position = positions[i].pos;
    var entity = viewer.entities.add({
      name: name,
      position:position,
      orientation:Cesium.Transforms.headingPitchRollQuaternion(
  position,
  hpr
),
      model:{
        uri:"windturbine.glb",
        heightReference: Cesium.HeightReference.CLAMP_TO_GROUND,
        minimumPixelSize: 50,
        maximumScale:200,
        scale:1.0,
        runAnimations:true,
      },
});
}



var frontView = {
  destination: new Cesium.Cartesian3.fromDegrees(
    131.287612,32.613684,3000
  ),
  orientation: {
    heading: Cesium.Math.toRadians(-90.27879878293835),
    pitch: Cesium.Math.toRadians(-30),
    roll: Cesium.Math.toRadians(0),
  },
  maximumHeight: 100,
};


viewer.scene.camera.setView({
  destination: frontView.destination,
  orientation: frontView.orientation,
});
