const path = require("path");
const fs = require('fs');

const healthSites = require("../res/geojson-data/health-sites.json");

healthSites.features = healthSites.features.map(feat => {
  const prop = feat.properties;
  const properties = {
    amenity: prop.amenity,
    addr_street: prop.addr_street,
    addr_city: prop.addr_city,
    name: prop.name,
    popupContent: 
    `<strong>${prop.addr_street}${prop.addr_city && prop.addr_street ? ",":""}${prop.addr_city}</strong>
    ${prop.addr_street || prop.addr_city ? "<br/>":""}
    ${feat.properties.name}
    ${prop.name ? "<br>":""}
    <small>Amenity: ${feat.properties.amenity}</small>`
  }

  return {
    type: feat.type,
    geometry: feat.geometry,
    properties, 
  }
})

const data = JSON.stringify(healthSites);

fs.writeFile(path.join(__dirname, '../res/geojson-data/simple-health-sites.json'), data, "utf-8", err => {
  if (err) console.log(err);
  else console.log(`File written succesfully`);
});
