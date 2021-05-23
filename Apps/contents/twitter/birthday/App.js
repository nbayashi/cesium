var clock = new Cesium.Clock({
  startTime: Cesium.JulianDate.fromIso8601("2021-05-19T14:00:00Z"),
  currentTime: Cesium.JulianDate.fromIso8601("2021-05-19T14:00:00Z"),
  stopTime: Cesium.JulianDate.fromIso8601("2021-05-21"),
  clockRange: Cesium.ClockRange.LOOP_STOP, // loop when we hit the end time
  clockStep: Cesium.ClockStep.SYSTEM_CLOCK_MULTIPLIER,
  multiplier: 3000, // how much time to advance each tick
  shouldAnimate: true, // Animation on by default
});

var viewer = new Cesium.Viewer("cesiumContainer", {
  clockViewModel: new Cesium.ClockViewModel(clock),
  sceneMode: Cesium.SceneMode.SCENE2D,
});


var camera = viewer.camera;
camera.setView({
  destination: Cesium.Cartesian3.fromDegrees(
    135.5847,
    38.0397,
    3000000.0
  ),
});



//var promise = Cesium.GeoJsonDataSource.load('tweetpoint.geojson');

/*
var tweet = Cesium.GeoJsonDataSource.load(
  "tweetpoint.geojson", {
  stroke: Cesium.Color.HOTPINK,
  fill: Cesium.Color.PINK,
  strokeWidth: 3,
  markerSymbol: '■'
});

viewer.dataSources.add(tweet)


const fs = require('fs');
const data = JSON.parse(fs.readFileSync('./tweetpoint.geojson', 'utf8'));
day = data["features"][10]["properties"]["date"]

*/



var promise = Cesium.GeoJsonDataSource.load('./birthday.geojson');
promise.then(function (dataSource) {
  viewer.dataSources.add(dataSource);
  var entities = dataSource.entities.values;

  for (var i = 0; i < entities.length; i++) {
    var entity = entities[i];

    entity.billboard = new Cesium.BillboardGraphics({
      image: 'confetti.png',
      show: true,
      scale: 0.04
    });
    /*
    var twit = entity.properties['X']["_value"];
    entity.label = new Cesium.LabelGraphics({
      text: String(twit),
      verticalOrigin: Cesium.VerticalOrigin.TOP,
      horizontalOrigin: Cesium.HorizontalOrigin.RIGHT,
      font: '15px Helvetica',
      fillColor: Cesium.Color.WHITE,
      outlineWidth: 2,
      style: Cesium.LabelStyle.FILL,
      pixelOffset: new Cesium.Cartesian2(20, 20)
    });
    
    //entity.properties['X']["_value"];
    */

    //ここからclock
    /*
    var tweet_date = entity.properties['date']["_value"]
    var pointtime = new Cesium.TimeIntervalCollection([
      new Cesium.TimeInterval({
        start: Cesium.JulianDate.fromIso8601(tweet_date + 'Z'),
        stop: Cesium.JulianDate.fromIso8601('2021-05-21T00:00:00Z')
      }),
    ]);
    
        entity.availability = pointtime;
        entity.point = new Cesium.PointGraphics({
          pixelSize: 10,
          color: new Cesium.Color(1, 1, 0),
          outlineColor: new Cesium.Color(1, 0, 0),
          outlineWidth: 1.3
        });
    */
  }



});




/*

//var billboards = scene.primitives.add(new Cesium.BillboardCollection());

for (let i = 0; i < data['features'].length; i++) {
  var x = data["features"][i]["properties"]["X"]
  var y = data["features"][i]["properties"]["Y"]
  viewer.entities.add({
    position: Cesium.Cartesian3.fromDegrees(x, y),
  });
}

var dataSource = new Cesium.CustomDataSource('tweetpoint.geojson');

var entity = dataSource.entities.add({
   position : Cesium.Cartesian3.fromDegrees(1, 2, 0),
   billboard : {
       image : 'image.png'
   }
});

viewer.dataSources.add(dataSource);

  viewer.entities.add({
    position: Cesium.Cartesian3.fromDegrees(-75.59777, 40.03883),
    billboard: {
      image: logoUrl,
    },
  });


billboards.add({
  position : new Cesium.Cartesian3(1.0, 2.0, 3.0),
  image : 'url/to/image'
});
billboards.add({
  position : new Cesium.Cartesian3(4.0, 5.0, 6.0),
  image : 'url/to/another/image'
});

data["features"][0]["properties"]["X"]
*/