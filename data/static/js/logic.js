var newYorkCoords = [40.73, -74.0059];

var mapZoomLevel = 12;

// Create the createMap function.

// Create the tile layer that will be the background of our map.

function createMap(bikeStations) {
  var streetMap = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    });
// Create a baseMaps object to hold the lightmap layer.
  var baseMaps = {
    "StreetMap" : streetMap
  };


   // Create an overlayMaps object to hold the bikeStations layer.

  var overlayMaps = {
    "BikeStations" : bikeStations
  };
// Create the map object with options.

  var myMap = L.map("map-id", {
    center: newYorkCoords,
    zoom: mapZoomLevel,
    layers: [streetMap, bikeStations]
  });
// Create a layer control, and pass it baseMaps and overlayMaps. Add the layer control to the map.
  L.control.layers(baseMaps, overlayMaps, {
    collapsed: false
  }).addTo(myMap);





}



  



// Create the createMarkers function.

function createMarkers (response) {

  var stations = response.data.stations;

  var bikeMarkers = [];

  for (let i = 0; i<stations.length; i++) {
    var station = stations[i];

    var bikeMarker = L.marker([station.lat, station.lon]).bindPopup("<h2>" + station.name + "<h2><h2>" + station.capacity + "</h2>");

    bikeMarkers.push(bikeMarker);



  }

  createMap(L.layerGroup(bikeMarkers));


}

let url = "https://gbfs.citibikenyc.com/gbfs/en/station_information.json"

d3.json(url).then(createMarkers);

  // Pull the "stations" property from response.data.

  // Initialize an array to hold the bike markers.

  // Loop through the stations array.
    // For each station, create a marker, and bind a popup with the station's name.

    // Add the marker to the bikeMarkers array.

  // Create a layer group that's made from the bike markers array, and pass it to the createMap function.


// Perform an API call to the Citi Bike API to get the station information. Call createMarkers when it completes.
