const path = require("path");
const express = require("express");
const axios = require("axios");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const findPlaces = async (codes) => {
  const response = await axios.get(
    `https://app.zipcodebase.com/api/v1/search?apikey=${process.env.REACT_APP_ZIPCODEBASE_API_KEY}&codes=${codes}&country=US`,
  );

  return response;
};

app.post("/places", async (req, res) => {
  try {
    const response = await findPlaces(req.body.codes);
    const { data } = response || {};

    res.json(data);
  } catch (error) {
    console.error("Error while finding places: ", error);
    res.json({});
  }
});

app.use(express.static(path.join(__dirname, "dist")));
app.set("port", process.env.PORT || 8080);

const server = app.listen(app.get("port"), () => {
  console.log("listening on port ", server.address().port);
});
