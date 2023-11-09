const express = require("express");
const route = express.Router();
const Rentals = require("./rentals.model");
const { checkExistingBooking, createBooking } = require("./rentals.service");
const Cars = require("../cars/car.model");
const CarRental = require("../cars-rental/carRental.model");


route.get("/booking/user/:userID", async(req, res)=>{
  const limit = req.query.limit;

  const queryOptions = {
    where: {
      user_id: req.params.userID,
    },
    order: [['createdAt', 'DESC']],
  };

  if (limit) {
    queryOptions.limit = parseInt(limit, 10);
  }

  if (!limit) {
    queryOptions.limit = 15;
  }


  try {
    const rentals = await Rentals.findAll(queryOptions);

    if(!rentals){
      res.status(404).json({ message : "Not Found Booking!"})
    }
  
    res.json(rentals);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
  
})

route.post("/booking", async (req, res) => {
  const {
    car_idcar,
    RentalStartDate,
    RentalEndDate,
    user_id,
    address,
    TotalCost,
    carRental_id,
  } = req.body;

  if (
    !car_idcar ||
    !RentalStartDate ||
    !RentalEndDate ||
    !user_id ||
    !address ||
    !TotalCost ||
    !carRental_id
  ) {
    return res.status(400).json({ error: "Missing required parameters" });
  }

  try {
    // Check for an existing booking
    const existingBooking = await checkExistingBooking(
      car_idcar,
      RentalStartDate,
      RentalEndDate
    );

    if (!existingBooking) {
      // No existing booking, create a new rental
      const newRental = await createBooking(
        car_idcar,
        RentalStartDate,
        RentalEndDate,
        user_id,
        address,
        TotalCost,
        carRental_id
      );

      res.json({
        message: "Rental booked successfully",
        rental: newRental.toJSON(),
      });
    } else {
      res
        .status(409)
        .json({ error: "Car not available for the specified period" });
    }
  } catch (error) {
    console.error("Error booking rental:", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

route.get("/booking", async (req, res) => {
  try {
    const rentals = await Rentals.findAll();

    res.status(200).json(rentals);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

route.put("/booking/:booking_id", async (req, res) => {
  try {
    const { status } = req.body;
    const rental = await Rentals.findByPk(req.params.booking_id);

    if (!rental) {
      return res.status(404).json({ error: "Booking not found" });
    }

    rental.RentalStatus = status;

    await rental.save();

    res.status(200).json(rental);
  } catch (error) {
    console.error("Error updating booking status:", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

route.put("/booking/review/:booking_id", async (req, res) => {
  try {
    const { review } = req.body;
    const rental = await Rentals.findByPk(req.params.booking_id);

    if (!rental) {
      return res.status(404).json({ error: "Booking not found" });
    }

    rental.review = review;

    await rental.save();

    res.status(200).json(rental);

  } catch (error) {
    console.error("Error updating booking status:", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

route.get("/booking/:booking_id", async (req, res) => {
  try {
    const rental = await Rentals.findByPk(req.params.booking_id);
    const Car = await Cars.findByPk(rental.car_idcar);
    const carRental = await CarRental.findByPk(rental.carRental_id,{
      attributes:['rental_name','phone'],
    });

    if (!rental) {
      return res.status(404).json({ error: "Booking not found" });
    }

    res.status(200).json({rental, Car, carRental});
  } catch (error) {
    console.error("Error updating booking status:", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
});


module.exports = route;
