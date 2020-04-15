

var viewer = new Cesium.Viewer('cesiumContainer', {
    shouldAnimate : true
  });
  var czml = Cesium.CzmlDataSource.load("total.czml")
  var dataSourcePromise = viewer.dataSources.add(czml);

  viewer.zoomTo(czml);