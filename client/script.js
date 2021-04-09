const map = L.map('mapid').setView([12.6042, 121.9822], 6.2);
const mapboxToken = "pk.eyJ1IjoibG1hZGVsYXJpYXJ0ZSIsImEiOiJja240b2FhYjQxam1kMm5xaXN4Z3dyaG1nIn0.iVjasx0o0kLMD3JlvxHBMA";

L.tileLayer(`https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=${mapboxToken}`, {
  attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
  maxZoom: 18,
  id: 'mapbox/streets-v11',
  tileSize: 512,
  zoomOffset: -1,
  accessToken: mapboxToken, 
}).addTo(map);

async function getHealthSites() {
  let data;

  try {
    const res = await fetch("http://localhost:3000/api/health-sites");
    data = await res.json();
    console.log(data)
  } catch (e) {
    console.log(e)
  }

  return data;
}

const geojsonMarkerOptions = {
    radius: 8,
    fillColor: "#ff7800",
    color: "#000",
    weight: 1,
    opacity: 1,
    fillOpacity: 0.8
}

getHealthSites().then(featureCollection => {
  console.log(featureCollection);
  L.geoJSON(featureCollection, {
    pointToLayer: (feature, latlng) => L.circleMarker(latlng, geojsonMarkerOptions),
    onEachFeature,
  }).addTo(map);
});

function onEachFeature(feature, layer) {
  // does this feature have a property named popupContent?
  if (feature.properties && feature.properties.popupContent) {
    layer.bindPopup(feature.properties.popupContent);
  }
}

