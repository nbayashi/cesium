var viewer = new Cesium.Viewer("cesiumContainer", {
  shouldAnimate: true,
  terrainProvider: Cesium.createWorldTerrain(),
  //sceneMode : Cesium.SceneMode.COLUMBUS_VIEW
});

var scene = viewer.scene;

scene.globe.depthTestAgainstTerrain = true;

//　初期のカメラ
var frontView = {
  destination: new Cesium.Cartesian3.fromDegrees(
    139.767493,35.620349,1200
  ),
  orientation: {
    heading: Cesium.Math.toRadians(0),
    pitch: Cesium.Math.toRadians(-20),
    roll: Cesium.Math.toRadians(0),
  },
  maximumHeight: 100,
};


viewer.scene.camera.setView({
  destination: frontView.destination,
  orientation: frontView.orientation,
});


// rain
var rainParticleSize = 15.0;
var rainRadius = 100000.0;
var rainImageSize = new Cesium.Cartesian2(
  rainParticleSize,
  rainParticleSize * 2.0
);

var rainSystem;

var rainGravityScratch = new Cesium.Cartesian3();
var rainUpdate = function (particle, dt) {
  rainGravityScratch = Cesium.Cartesian3.normalize(
    particle.position,
    rainGravityScratch
  );
  rainGravityScratch = Cesium.Cartesian3.multiplyByScalar(
    rainGravityScratch,
    -1050.0,
    rainGravityScratch
  );

  particle.position = Cesium.Cartesian3.add(
    particle.position,
    rainGravityScratch,
    particle.position
  );

  var distance = Cesium.Cartesian3.distance(
    scene.camera.position,
    particle.position
  );
  if (distance > rainRadius) {
    particle.endColor.alpha = 0.0;
  } else {
    particle.endColor.alpha =
      rainSystem.endColor.alpha / (distance / rainRadius + 0.1);
  }
};

rainSystem = new Cesium.ParticleSystem({
  modelMatrix: new Cesium.Matrix4.fromTranslation(
    scene.camera.position
  ),
  speed: -2.0,
  lifetime: 15.0,
  emitter: new Cesium.SphereEmitter(rainRadius),
  startScale: 1.0,
  endScale: 0.0,
  image: "circular_particle.png",
  emissionRate: 9000.0,
  startColor: new Cesium.Color(0.27, 0.5, 0.7, 0.0),
  endColor: new Cesium.Color(0.27, 0.5, 0.7, 0.98),
  imageSize: rainImageSize,
  updateCallback: rainUpdate,
});
scene.primitives.add(rainSystem);



var czml = [
  {
    id: "document",
    name: "Polygon",
    version: "1.0",
  },
  {
    id: "Polygon",
    name: "polygon",
    polygon: {
      positions: {
        cartographicDegrees: [
         139.732036045,35.618979964,0,
          139.732036045,35.705328335,0,
          139.815044226,35.705328335,0,
          139.815044226,35.618979964,0
        ],
      },
      material: {
        solidColor: {
          color: {
            rgba: [65, 125, 190, 90],
          },
        },
      },
      extrudedHeight: 56.20,
      closeTop: true,
      closeBottom: true,
    },
  },
];

viewer.dataSources.add(Cesium.CzmlDataSource.load(czml));



var position = new Cesium.Cartesian3.fromDegrees(
  139.755389, 35.664875
);
var heading = Cesium.Math.toRadians(1);
var pitch = Cesium.Math.toRadians(0);
var roll = Cesium.Math.toRadians(0);
var hpr = new Cesium.HeadingPitchRoll(heading, pitch, roll);
var orientation = Cesium.Transforms.headingPitchRollQuaternion(
  position,
  hpr
);


  
var entity = viewer.entities.add({
  name: "building",
  position: position,
  orientation: orientation,
  model: {
    uri: "build.glb",
    
    heightReference: Cesium.HeightReference.CLAMP_TO_GROUND,
    scale: 0.81
  },
});

