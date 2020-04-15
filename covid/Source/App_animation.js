var viewer = new Cesium.Viewer('cesiumContainer', {
    shouldAnimate : true
  });

var czml = Cesium.CzmlDataSource.load('https://nbayashi.github.io/cesium/covid/Source/total.czml');
 
viewer.dataSources.add(czml);