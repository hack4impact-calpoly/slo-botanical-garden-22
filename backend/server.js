const express = require("express");
const dotenv = require("dotenv");
const MongooseConnector = require("./db-helper");
const app = express();

app.use(cors());

dotenv.config();

app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  next();
});

function helloHandler(request, response) {
  console.log("Request Made");
  //const name = request.query.name;

  response.status(200);
  response.send("Hello, World!");
}

//app.use("/announcements", announcement);
require("./routes/announcement-api.route")(app);

app.get("/", helloHandler);

app.get("*", (req, res) => {
  res.status(400).send("Page not found");
});

app.get("/fetchAnnouncements", async (req, res) => {
  console.log("IN BACKEND");
  var request = fetch(
    "https://yb75zu2sq6.execute-api.us-west-2.amazonaws.com/default",
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": "TJLRudRqUI8N22JHVUQDo2Ok3L7YoSbm7ikBSyAp",
      },
    }
  )
    .then((response) => response.json())
    .then((data) => {
      return data;
    })
    .catch((error) => console.log("Error while fetching:", error));
  return {
    // eslint-disable-next-line no-undef
    payload: request,
  };
});

(async () => {
  // Satisfy react default port
  const PORT = Number(process.env.PORT);
  if (process.argv.includes("dev")) {
    if (!PORT) {
      console.error(
        "No PORT environment var found... add it to your .env file!"
      );
      process.exit(1);
    }
    app.listen(PORT, () => console.log(`server running on port ${PORT}`));
  }
})();

module.exports = app;
