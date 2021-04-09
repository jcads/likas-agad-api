const path = require("path");

const healthSites = require("../res/geojson-data/health-sites.json");

healthSites.features = healthSites.features.map(feat => {
  const properties = {
    amenity: feat.properties.amenity,
    addr_street: feat.properties.addr_street,
    addr_city: feat.properties.addr_city,
    name: feat.properties.name,
    popupContent: 
    `${feat.properties.name}<br> Amenity: ${feat.properties.amenity}`
  }

  return {
    type: feat.type,
    geometry: feat.geometry,
    properties, 
  }
})

const data = JSON.stringify(healthSites);

fs = require('fs');

fs.writeFile(path.join(__dirname, '../res/geojson-data/simple-health-sites.json'), data, "utf-8", err => {
  if (err) console.log(err);
  else console.log(`File written succesfully`);
});
