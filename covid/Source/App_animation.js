var viewer = new Cesium.Viewer('cesiumContainer', {
    shouldAnimate : true
  });

var czml = Cesium.CzmlDataSource.load('Source/total.czml');
 
viewer.dataSources.add(czml);