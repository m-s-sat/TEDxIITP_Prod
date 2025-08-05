require("dotenv").config();
const cors = require("cors");

const express = require("express");
const app = express();
const PORT = process.env.PORT || 8000;
const connectDB = require("./connection");
const contactUsRoutes = require("./routes/contactUs");
const merchRoutes = require("./routes/merch");
const ticketsRoutes = require("./routes/tickets");
const corsOptions = {
  origin: function (origin, callback) {
    if (whitelistedDomains.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
};
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
//const whitelistedDomains = process.env.WHITELIST_DOMAINS.split(",");
app.use(cors(corsOptions));
connectDB();

app.use("/api/contactUs", contactUsRoutes);
app.use("/api/merch", merchRoutes);
app.use("/api/tickets", ticketsRoutes);
//app.use("buyMerch");

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
