require("dotenv").config();
const cors = require("cors");

const express = require("express");
const app = express();
const PORT = process.env.PORT || 8000;
const connectDB = require("./connection");
const contactUsRoutes = require("./routes/contactUs");
const merchRoutes = require("./routes/merch");
const ticketsRoutes = require("./routes/tickets");
const partnerWithUsRoutes = require("./routes/partnerWithUs");

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Configure CORS properly
app.use(
  cors({
    origin: true,
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization", "X-Requested-With"],
  })
);
connectDB();

// Test route to check if server is working
app.get("/api/test", (req, res) => {
  res.json({ message: "Server is working!", timestamp: new Date() });
});

app.use("/api/contactUs", contactUsRoutes);
app.use("/api/merch", merchRoutes);
app.use("/api/tickets", ticketsRoutes);
app.use("/api/partnerWithUs", partnerWithUsRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
