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
 var viewer = new Cesium.Viewer('cesiumContainer');
 viewer.dataSources.add(Cesium.CzmlDataSource.load(czml));