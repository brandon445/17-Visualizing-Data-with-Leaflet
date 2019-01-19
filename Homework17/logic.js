var url = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/1.0_week.geojson";
// Map
var myMap = L.map("map", {
    center: [37.09, -105.71],
    zoom: 5
});
// Map Layer
var streetmap = L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
    attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
    maxZoom: 18,
    id: "mapbox.streets",
    accessToken: API_KEY
}).addTo(myMap);

// Reference
var tube = {"type":"Feature","properties":{"mag":2.6,"place":"19km SSE of Nixon, Texas","time":1547512705840,"updated":1547527594040,"tz":-360,"url":"https://earthquake.usgs.gov/earthquakes/eventpage/us2000j3yu","detail":"https://earthquake.usgs.gov/earthquakes/feed/v1.0/detail/us2000j3yu.geojson","felt":null,"cdi":null,"mmi":null,"alert":null,"status":"reviewed","tsunami":0,"sig":104,"net":"us","code":"2000j3yu","ids":",us2000j3yu,","sources":",us,","types":",geoserve,origin,phase-data,","nst":null,"dmin":0.859,"rms":0.45,"gap":125,"magType":"mb_lg","type":"earthquake","title":"M 2.6 - 19km SSE of Nixon, Texas"},"geometry":{"type":"Point","coordinates":[-97.6825,29.1077,5]},"id":"us2000j3yu"}



// Choose Color
function chooseColor(d) {
    return d >= 5 ? '#f06b6b':
           d >= 4 ? '#f0a76b':
           d >= 3 ? '#f3ba4d':
           d >= 2 ? '#f3db4d':
           d >= 1 ? '#e1f34d':
                    '#b7f34d';
};

// Perform a GET request to the query URL
d3.json(url, function(data) {
    console.log(data.features[2].properties.mag);
    L.geoJSON(data, {
        pointToLayer: function(feature, coord) {
            return new L.circle(coord, {
                radius: feature.properties.mag*10000,
                fillOpacity: 0.85,
                color: chooseColor(feature.properties.mag)
            });
        },
        onEachFeature: function(feature, layer) {
            layer.bindPopup("<h4>" + feature.properties.place + "</h4><p>Magnitude: " + feature.properties.mag + "</p>")
        }
    }).addTo(myMap);
    
    
});



// for(var i=0; i < data.features; i++)
    // L.geoJSON(data, {
    //     style: function(feature) {
    //         switch (feature.properties.magType) {
    //             case 'ml': return {color: "#F1C40F"};
    //             case 'md': return {color: "#D35400"};
    //         }
    //     }
    // }).addTo(myMap);

///////// var myLayer = L.geoJSON().addTo(myMap);
///////// myLayer.addData(geojsonFeature);
  
