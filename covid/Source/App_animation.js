

var viewer = new Cesium.Viewer('cesiumContainer', {
    shouldAnimate : true
  });
  var czml = Cesium.CzmlDataSource.load("total.czml")
  viewer.dataSources.add(czml);

  viewer.zoomTo(czml);