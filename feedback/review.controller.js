const express = require("express");
const route = express.Router();
const CarReview = require("./review.model");
const Car = require("../cars/car.model");
const User = require("../users/user.model");
const { getCarReview } = require("./review.service");

route.get("/review/:car_idcar", async (req, res) => {
  try {
    const carReviews = await getCarReview(req.params.car_idcar);

    res.status(200).json(carReviews);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

route.post("/review/:car_idcar", async (req, res) => {
  try {
    const { user_id, rating, comment } = req.body;
    const car_idcar = req.params.car_idcar

    // Check if the car and user exist
    const car = await Car.findByPk(car_idcar);
    const user = await User.findByPk(user_id);

    if (!car || !user) {
      return res.status(404).json({ message: "Car or user not found" });
    }

    // Create the car review
    const carReview = await CarReview.create({
      car_idcar,
      user_id,
      rating,
      comment,
    });

    res.status(201).json(carReview);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

module.exports = route;
