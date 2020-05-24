var viewer = new Cesium.Viewer('cesiumContainer', { sceneMode : Cesium.SceneMode.SCENE2D });

var redRectangle = viewer.entities.add({
    name : 'Red translucent rectangle with outline',
    rectangle : {
        coordinates : Cesium.Rectangle.fromDegrees(-110.0, 20.0, -80.0, 25.0),
        material : Cesium.Color.RED.withAlpha(0.5),
        outline : true,
        outlineColor : Cesium.Color.RED
    }
});

Sandcastle.addToolbarButton('zoomTo', function() {
    viewer.zoomTo(redRectangle, new Cesium.HeadingPitchRange(Math.PI / 2, -Math.PI / 4, 4000000));
});

Sandcastle.addToolbarButton('flyTo', function() {
    viewer.flyTo(redRectangle, {
        offset : new Cesium.HeadingPitchRange(Math.PI / 2, -Math.PI / 4, 4000000)
    });
});