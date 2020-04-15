var viewer = new Cesium.Viewer('cesiumContainer', {
    shouldAnimate : true
  });

var czml = Cesium.CzmlDataSource.load(czml);
 
viewer.dataSources.add(czml);