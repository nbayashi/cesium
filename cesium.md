## viewer

- 3D
var viewer = new Cesium.Viewer('cesiumContainer', {
    shouldAnimate : true
});


- 地図を２。５Dにする
var viewer = new Cesium.Viewer('cesiumContainer', { sceneMode : Cesium.SceneMode.SCENE2D });

- 地図のリセット
viewer.dataSources.removeAll();


## viewer.zoomTo,flyTo
- エンティティにズーム
viewer.flyTo(dataSource);

- by coordinate

var center = Cesium.Cartesian3.fromDegrees(-82.5, 135.3);
viewer.camera.lookAt(center, new Cesium.Cartesian3(0.0, 0.0, 42.0));

----
    viewer.camera.setView({
        destination : Cesium.Cartesian3.fromDegrees(
            80,
            80,
            Cesium.Ellipsoid.WGS84.cartesianToCartographic(viewer.camera.position).height
        )
    });
----

var center = Cesium.Cartesian3.fromDegrees(137.825362273258, 31.2765107698755);
var heading = Cesium.Math.toRadians(90);
var pitch = Cesium.Math.toRadians(30);
var range = 30000000;
viewer.camera.lookAt(center,new Cesium.HeadingPitchRange(heading, pitch, range));

----

## toolbar

  <div style="position: absolute;top: 20px;left: 20px;">
    <button id ="id" type ="bottun" class ="cesium-bottun">世界の状況</button> 
</div>

document.getElementById("id").addEventListener("click",function () {

    
var dataSourcePromise = Cesium.CzmlDataSource.load(czml_eachday);
viewer.dataSources.add(dataSourcePromise);
viewer.zoomTo(dataSourcePromise);

});

{
    viewer.zoomTo(redRectangle, new Cesium.HeadingPitchRange(Math.PI / 2, -Math.PI / 4, 4000000));
}