var viewer = new Cesium.Viewer('cesiumContainer');






  var promise = Cesium.GeoJsonDataSource.load('https://nbayashi.github.io/cesium/covid/Source/buffer10.geojson');
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
          if (entity.properties.累積3月19日の状況　== 0) {
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
          entity.polygon.extrudedHeight = entity.properties.累積3月19日の状況 *1000  ;
      }
  }).otherwise(function(error){
      //Display any errrors encountered while loading.
      window.alert(error);
  });

viewer.zoomTo(promise);

