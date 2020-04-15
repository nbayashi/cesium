var viewer = new Cesium.Viewer('cesiumContainer', {
    shouldAnimate : true
});

var dataSourcePromise = Cesium.CzmlDataSource.load('https://nbayashi.github.io/cesium/covid/Source/total.czml');

viewer.dataSources.add(dataSourcePromise);
viewer.zoomTo(dataSourcePromise);
