var viewer = new Cesium.Viewer('cesiumContainer');
var dataSource = Cesium.GeoJsonDataSource.load('https://nbayashi.github.io/cesium/covid/Source/buffer10.geojson',{
  stroke:Cesium.Color.PINK,
    strokeWidth:5
});
viewer.dataSources.add(dataSource);
viewer.zoomTo(dataSource);

