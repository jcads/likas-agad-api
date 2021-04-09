const express = require("express");

const healthSites = require("./res/geojson-data/health-sites.json");

healthSites.features = healthSites.features.map(feat => {
  const properties = {
    amenity: feat.properties.amenity,
    addr_street: feat.properties.addr_street,
    addr_city: feat.properties.addr_city,
    name: feat.properties.name,
  }

  return {
    type: feat.type,
    geometry: feat.geometry,
    properties, 
  }
})

const app = express();
const PORT = 3000;

app.get("/api/health-sites", (req, res) => {
  console.log(healthSites)
  res.json(healthSites);
})

app.listen(PORT, () => {
  console.log(`App on port ${PORT}`)
})
