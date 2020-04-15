var viewer = new Cesium.Viewer('cesiumContainer', {
  shouldAnimate : true
});

//Example 1: Apply custom graphics after load.


  document.getElementById("累積感染者数").addEventListener("click",function () {
    viewer.dataSources.removeAll();
    
    var czml = [{
      "id" : "document",
      "name" : "CZML",
      "version" : "1.0"
    },
    {
      "id" : "shape1",
      "name" : "TOKYO",
      "position" : {
        "cartographicDegrees" : [139.77, 35.68, 20000.0]
      },
      "ellipse" : {
        "semiMinorAxis" : 50000.0,
        "semiMajorAxis" : 50000.0,
        "extrudedHeight" : {
          "number" : 20000.0
        },
        "rotation" : {
          "number" : 0.8
        },
        "material" : {
          "solidColor" : {
            "color" : {
              "rgba" : [0, 255, 0, 100]
            }
          }
        },
        "outline" : true,
        "outlineColor" : {
          "rgba" : [255, 0, 0, 0]
        }
      }
    }];
   viewer.dataSources.add(Cesium.CzmlDataSource.load(czml));


    });


document.getElementById("現在は入院等").addEventListener("click",function () {
  //Cesium.Math.setRandomNumberSeed(0);
  viewer.dataSources.removeAll();
  
  var promise = Cesium.GeoJsonDataSource.load('https://nbayashi.github.io/cesium/covid/Source/buffer10_200403.geojson');
  //viewer.dataSources.add(promise);

  promise.then(function(dataSource) {
      viewer.dataSources.add(dataSource);
      //Get the array of entities
      var entities = dataSource.entities.values;

      var colorHash = {};
      for (var i = 0; i < entities.length; i++) {
          //For each entity, create a random color based on the state name.
          //Some states have multiple entities, so we store the color in a
          //hash so that we use the same color for the entire state.
          var entity = entities[i];
          var name = entity.name;
          var color = colorHash[name];
          if (entity.properties.現在は入院等　== 0) {
              color = Cesium.Color.fromRandom({
                alpha : 255.0
            });
              colorHash[name] = color;
          }else{
                color =   Cesium.Color.CRIMSON;
            colorHash[name] = color;
          }
      
          //Set the polygon material to our random color.
          entity.polygon.material = color;
          //Remove the outlines.
          entity.polygon.outline = false;

          //Extrude the polygon based on the state's population.  Each entity
          //stores the properties for the GeoJSON feature it was created from
          //Since the population is a huge number, we divide by 50.
          entity.polygon.extrudedHeight = entity.properties.現在は入院等 *1000  ;
      }
  }).otherwise(function(error){
    //Display any errrors encountered while loading.
    window.alert(error);
});
//   viewer.dataSources.add(Cesium.GeoJsonDataSource.load('https://nbayashi.github.io/cesium/covid/Source/buffer10.geojson'));

});
  

document.getElementById("退院者").addEventListener("click",function () {
  //Cesium.Math.setRandomNumberSeed(0);
  viewer.dataSources.removeAll();
  
  var promise = Cesium.GeoJsonDataSource.load('https://nbayashi.github.io/cesium/covid/Source/buffer10_200403.geojson');
  //viewer.dataSources.add(promise);

  promise.then(function(dataSource) {
      viewer.dataSources.add(dataSource);
      //Get the array of entities
      var entities = dataSource.entities.values;

      var colorHash = {};
      for (var i = 0; i < entities.length; i++) {
          //For each entity, create a random color based on the state name.
          //Some states have multiple entities, so we store the color in a
          //hash so that we use the same color for the entire state.
          var entity = entities[i];
          var name = entity.name;
          var color = colorHash[name];
          if (entity.properties.退院者　== 0) {
              color = Cesium.Color.fromRandom({
                alpha : 255.0
            });
              colorHash[name] = color;
          }else{
                color =   Cesium.Color.CRIMSON;
            colorHash[name] = color;
          }
      
          //Set the polygon material to our random color.
          entity.polygon.material = color;
          //Remove the outlines.
          entity.polygon.outline = false;

          //Extrude the polygon based on the state's population.  Each entity
          //stores the properties for the GeoJSON feature it was created from
          //Since the population is a huge number, we divide by 50.
          entity.polygon.extrudedHeight = entity.properties.退院者 *1000  ;
      }
  }).otherwise(function(error){
    //Display any errrors encountered while loading.
    window.alert(error);
});
//   viewer.dataSources.add(Cesium.GeoJsonDataSource.load('https://nbayashi.github.io/cesium/covid/Source/buffer10.geojson'));

});


document.getElementById("死亡者").addEventListener("click",function () {
  //Cesium.Math.setRandomNumberSeed(0);
  viewer.dataSources.removeAll();
  
  var promise = Cesium.GeoJsonDataSource.load('https://nbayashi.github.io/cesium/covid/Source/buffer10_200403.geojson');
  //viewer.dataSources.add(promise);

  promise.then(function(dataSource) {
      viewer.dataSources.add(dataSource);
      //Get the array of entities
      var entities = dataSource.entities.values;

      var colorHash = {};
      for (var i = 0; i < entities.length; i++) {
          //For each entity, create a random color based on the state name.
          //Some states have multiple entities, so we store the color in a
          //hash so that we use the same color for the entire state.
          var entity = entities[i];
          var name = entity.name;
          var color = colorHash[name];
          if (entity.properties.死亡者　== 0) {
              color = Cesium.Color.fromRandom({
                alpha : 255.0
            });
              colorHash[name] = color;
          }else{
                color =   Cesium.Color.CRIMSON;
            colorHash[name] = color;
          }
      
          //Set the polygon material to our random color.
          entity.polygon.material = color;
          //Remove the outlines.
          entity.polygon.outline = false;

          //Extrude the polygon based on the state's population.  Each entity
          //stores the properties for the GeoJSON feature it was created from
          //Since the population is a huge number, we divide by 50.
          entity.polygon.extrudedHeight = entity.properties.死亡者 *1000  ;
      }
  }).otherwise(function(error){
    //Display any errrors encountered while loading.
    window.alert(error);
});
//   viewer.dataSources.add(Cesium.GeoJsonDataSource.load('https://nbayashi.github.io/cesium/covid/Source/buffer10.geojson'));

});
 

