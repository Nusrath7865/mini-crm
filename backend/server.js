const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();
const leadRoutes = require("./routes/leadRoutes");

console.log(process.env.MONGO_URI);

const app = express();

app.use(cors({
  origin:"*",
}));
  

app.use(express.json());

mongoose.connect(process.env.MONGO_URI, {
  serverSelectionTimeoutMS: 5000
})
.then(() => console.log("MongoDB Connected"))
.catch((err) => console.log(err));

app.get("/", (req, res) => {
  res.send("CRM API Running");
});

const PORT = 5000;
app.use("/api/leads", leadRoutes);
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});