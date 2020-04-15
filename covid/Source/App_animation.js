var czml =Cesium.CzmlDataSource.load('https://nbayashi.github.io/cesium/covid/Source/total.czml')
viewer.dataSources.add(czml);

viewer.zoomTo(czml);