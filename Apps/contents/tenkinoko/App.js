var viewer = new Cesium.Viewer("cesiumContainer", {
  terrainProvider: Cesium.createWorldTerrain(),
  sceneMode : Cesium.SceneMode.COLUMBUS_VIEW
});

var scene = viewer.scene;




var czml = [
  {
    id: "document",
    name: "CZML Geometries: Polygon",
    version: "1.0",
  },
  {
    id: "polygon1",
    name: "sea level",
    polygon: {
      positions: {
        cartographicDegrees: [
          139.153680721,36.016256699,56.2,
          139.153680721,35.402131958,56.2,
          140.203354924,35.402131958,56.2,
          140.203354924,36.016256699,56.2
        ],
      },
      material: {
        solidColor: {
          color: {
            rgba: [100, 250, 250, 90],
          },
        },
      },
      perPositionHeight: true,
      outline: false,
      
    },
  },
];

var dataSourcePromise = Cesium.CzmlDataSource.load(czml);
viewer.dataSources.add(dataSourcePromise);





var scaleMatrix = Cesium.Matrix4.fromScale(new Cesium.Cartesian3(1.0, 0.82, 1.0));


var modelMatrix = Cesium.Transforms.eastNorthUpToFixedFrame(
    Cesium.Cartesian3.fromDegrees(139.754989, 35.664875, 40.0));
var model = scene.primitives.add(Cesium.Model.fromGltf({
    url : 'build.glb',
    heightReference : Cesium.HeightReference.CLAMP_TO_GROUND,
    modelMatrix : Cesium.Matrix4.multiply(modelMatrix, scaleMatrix, modelMatrix),
    scale : 1.0
}));



//　初期のカメラ
var frontView = {
  destination: new Cesium.Cartesian3.fromDegrees(
    139.766593,35.625049,500
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
