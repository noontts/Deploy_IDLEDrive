const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const path = require("path");
const { connect, sync } = require("./config/dbConfig");
const carsRoutes = require("./cars/car.controller");
const rentalRoutes = require("./cars-rental/carRental.controller");
const reviewRoutes = require("./feedback/review.controller");
const userRoutes = require("./users/user.controller");
const bookingRoutes = require("./Rentals/rentals.controller");
const imageRoutes = require("./cars/image.controller");
const routesDetailRoutes = require("./routes/routes.controller");
const eventRoutes = require('./events/event.controller');
async function initializeDatabase() {
  await connect();
  await sync();
}

initializeDatabase();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("tiny"));

app.use("/api/v1/idledrive/car-rental", rentalRoutes);
app.use("/api/v1/idledrive", carsRoutes, reviewRoutes);
app.use("/api/v1/idledrive/users", userRoutes);
app.use("/api/v1/idledrive", bookingRoutes);
app.use("/api/v1/idledrive", imageRoutes);
app.use("/api/v1/idledrive", routesDetailRoutes);
app.use("/api/v1/idledrive", eventRoutes);
// app.use("/api/v1/idledrive/upload", uploadRoute);

app.use(express.static("./client/dist"));
app.get("*", (req, res)=>{
  res.sendFile(path.resolve(__dirname,"client","dist","index.html"));
})

app.listen(PORT, () => {
  console.log(`Listening on port: ${PORT}`);
});
