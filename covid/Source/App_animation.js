var viewer = new Cesium.Viewer('cesiumContainer');
viewer.dataSources.add(Cesium.CzmlDataSource.load('https://nbayashi.github.io/cesium/covid/Source/test.czml'));
