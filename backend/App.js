require("dotenv").config();
const express = require("express");
const app = express();
const PORT = process.env.PORT || 3001;

// const discordStrategy = require("./strategies/discordstrategy");
const db = require("./database/database");
const cors = require("cors");

db.then(() => console.log("Connected to MongoDB.")).catch((err) =>
  console.log(err)
);

// Routes
const UserRoutes = require("./routes/user");
app.use(cors());
app.use(express.json());

app.use(UserRoutes);

app.listen(PORT, () => {
  console.log(`Now listening to requests on port ${PORT}`);
});
