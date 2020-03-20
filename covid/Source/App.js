var viewer = new Cesium.Viewer('cesiumContainer');
viewer.dataSources.add(Cesium.GeoJsonDataSource.load('pref_covid.geojson', {
  stroke: Cesium.Color.HOTPINK,
  fill: Cesium.Color.PINK,
  strokeWidth: 3,
  markerSymbol: '?'
}));