require("dotenv").config();
const express = require("express");
const app = express();
const PORT = process.env.PORT || 8000;
const connectDB = require("./connection");
const contactUsRoutes = require("./routes/contactUs");
const merchRoutes = require("./routes/merch");
const ticketsRoutes = require("./routes/tickets");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

connectDB();

app.use("/api/contactUs", contactUsRoutes);
app.use("/api/merch", merchRoutes);
app.use("/api/tickets", ticketsRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
