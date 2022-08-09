const Axios = require("axios");
const Express = require("express");
const Path = require("path");

const app = Express();

app.use(Express.json());
app.use(Express.urlencoded({ extended: false }));

const fetchData = async (codes) => {
  const url = `https://app.zipcodebase.com/api/v1/search?apikey=${process.env.REACT_APP_ZIPCODEBASE_API_KEY}&codes=${codes}`;

  const response = await Axios.get(
    url,
  );

  return response;
};

app.post("/data", async (req, res) => {
  try {
    const response = await fetchData(req.body.codes);
    const { data } = response || {};

    res.json(data);
  } catch (error) {
    console.error("Error while fetching data: ", error);
    res.json({});
  }
});

app.use(Express.static(Path.join(__dirname, "build")));
app.set("port", process.env.PORT || 8080);

app.listen(app.get("port"), () => {
  console.log("listening on port ", app.get("port"));
});
