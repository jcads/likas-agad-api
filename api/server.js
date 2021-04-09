const express = require("express");
const cors = require("cors");

const healthSites = require("./res/geojson-data/simple-health-sites.json");

const app = express();
app.use(cors());

const PORT = 3000;

app.get("/api/health-sites", (req, res) => {
  res.json(healthSites);
})

app.listen(PORT, () => {
  console.log(`App on port ${PORT}`)
})
