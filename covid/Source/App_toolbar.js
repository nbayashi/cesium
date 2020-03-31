
//Sandcastle_Begin
var viewer = new Cesium.Viewer('cesiumContainer', {
    shouldAnimate : true
});


var promise = Cesium.GeoJsonDataSource.load('https://nbayashi.github.io/cesium/covid/Source/buffer10.geojson');
  viewer.dataSources.add(promise);
viewer.zoomTo(promise);


//Example 1: Apply custom graphics after load.
Sandcastle.addToolbarButton('感染者の状況', function() {
  //Seed the random number generator for repeatable results.
  Cesium.Math.setRandomNumberSeed(0);

  
  promise.then(function(dataSource) {
  viewer.dataSources.add(promise);
viewer.zoomTo(promise);
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
          if (!color) {
              color = Cesium.Color.fromRandom({
                  alpha : 1.0
              });
              colorHash[name] = color;
          }

          //Set the polygon material to our random color.
          entity.polygon.material = Cesium.Color.CRIMSON;
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


});





//Example 2: Apply custom graphics after load.
Sandcastle.addToolbarButton('対前日比', function() {
  //Seed the random number generator for repeatable results.
  Cesium.Math.setRandomNumberSeed(0);

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
          if (!color) {
              color = Cesium.Color.fromRandom({
                  alpha : 1.0
              });
              colorHash[name] = color;
          }

          //Set the polygon material to our random color.
          entity.polygon.material = Cesium.Color.CRIMSON;
          //Remove the outlines.
          entity.polygon.outline = false;

          //Extrude the polygon based on the state's population.  Each entity
          //stores the properties for the GeoJSON feature it was created from
          //Since the population is a huge number, we divide by 50.
          entity.polygon.extrudedHeight = entity.properties.対前日比 *1000  ;
      }
  }).otherwise(function(error){
      //Display any errrors encountered while loading.
      window.alert(error);
  });


});



//Example 3: Apply custom graphics after load.
Sandcastle.addToolbarButton('うち現在入院等', function() {
  //Seed the random number generator for repeatable results.
  Cesium.Math.setRandomNumberSeed(0);

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
          if (!color) {
              color = Cesium.Color.fromRandom({
                  alpha : 1.0
              });
              colorHash[name] = color;
          }

          //Set the polygon material to our random color.
          entity.polygon.material = Cesium.Color.CRIMSON;
          //Remove the outlines.
          entity.polygon.outline = false;

          //Extrude the polygon based on the state's population.  Each entity
          //stores the properties for the GeoJSON feature it was created from
          //Since the population is a huge number, we divide by 50.
          entity.polygon.extrudedHeight = entity.properties.うち現在入院等 *1000  ;
      }
  }).otherwise(function(error){
      //Display any errrors encountered while loading.
      window.alert(error);
  });

});




//Example 3: Apply custom graphics after load.
Sandcastle.addToolbarButton('うち退院', function() {
  //Seed the random number generator for repeatable results.
  Cesium.Math.setRandomNumberSeed(0);

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
          if (!color) {
              color = Cesium.Color.fromRandom({
                  alpha : 1.0
              });
              colorHash[name] = color;
          }

          //Set the polygon material to our random color.
          entity.polygon.material = Cesium.Color.CRIMSON;
          //Remove the outlines.
          entity.polygon.outline = false;

          //Extrude the polygon based on the state's population.  Each entity
          //stores the properties for the GeoJSON feature it was created from
          //Since the population is a huge number, we divide by 50.
          entity.polygon.extrudedHeight = entity.properties.うち退院 *1000  ;
      }
  }).otherwise(function(error){
      //Display any errrors encountered while loading.
      window.alert(error);
  });


});




//Example 3: Apply custom graphics after load.
Sandcastle.addToolbarButton('うち死亡', function() {
  //Seed the random number generator for repeatable results.
  Cesium.Math.setRandomNumberSeed(0);

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
          if (!color) {
              color = Cesium.Color.fromRandom({
                  alpha : 1.0
              });
              colorHash[name] = color;
          }

          //Set the polygon material to our random color.
          entity.polygon.material = Cesium.Color.CRIMSON;
          //Remove the outlines.
          entity.polygon.outline = false;

          //Extrude the polygon based on the state's population.  Each entity
          //stores the properties for the GeoJSON feature it was created from
          //Since the population is a huge number, we divide by 50.
          entity.polygon.extrudedHeight = entity.properties.うち死亡 *1000  ;
      }
  }).otherwise(function(error){
      //Display any errrors encountered while loading.
      window.alert(error);
  });


});

//Reset the scene when switching demos.
Sandcastle.reset = function() {
  viewer.dataSources.removeAll();


};
