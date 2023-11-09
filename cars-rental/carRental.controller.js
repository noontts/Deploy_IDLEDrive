const express = require("express");
const CarRental = require("./carRental.model");
const Rentals = require("../Rentals/rentals.model");
const { Op } = require("sequelize");
const { carRentalDetail, sumOfRentalReviews } = require("./carRental.service");
const Cars = require("../cars/car.model");
const CarImages = require("../cars/carImage.model");
const route = express.Router();
const CarRentalDocument = require("./carRentalDocument.model");
const { uploadImage } = require("../config/multerConfig");


route.post("/auth/register", async (req, res) => {
  try {
    const {
      rental_name,
      username,
      email,
      password,
      FirstName,
      LastName,
      phone,
      location,
    } = req.body;

    // Check if the required fields are present
    if (!rental_name || !username || !email || !password) {
      return res.status(400).json({ error: "All fields are required" });
    }

    const existingUser = await CarRental.findOne({
      where: {
        [Op.or]: [{ username: username }, { email: email }],
      },
    });

    if (existingUser) {
      return res
        .status(400)
        .json({ error: "Username or email already exists" });
    }

    // Create a new user
    const newUser = await CarRental.create({
      rental_name,
      username,
      email,
      password,
      FirstName,
      LastName,
      phone,
      location,
    });

    res
      .status(201)
      .json({ message: "User registered successfully", user: newUser });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

route.post("/auth/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if the required fields are present
    if (!email || !password) {
      return res.status(400).json({ error: "Email and password are required" });
    }

    // Find user by email
    const user = await CarRental.findOne({
      where: { email: email },
    });

    if (!user || user.password !== password) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    if(user.status !== "1"){
      return res.status(401).json({ error: "Merchant not yet verified" });
    }

    res.json({ message: "Login successful", user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

route.put("/auth/edit/:userId", async (req, res) => {
  try {
    const { rental_name, username, email, password } = req.body;
    const userId = req.params.userId;

    // Check if the required fields are present
    if (!rental_name || !username || !email || !password) {
      return res.status(400).json({ error: "All fields are required" });
    }

    // Find user by ID
    const user = await CarRental.findByPk(userId);

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Update user data
    user.rental_name = rental_name;
    user.username = username;
    user.email = email;
    user.password = password;

    await user.save();

    res.json({ message: "User updated successfully", user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

route.delete("/auth/delete/:userId", async (req, res) => {
  try {
    const userId = req.params.userId;

    // Find user by ID
    const user = await CarRental.findByPk(userId);

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Delete user
    await user.destroy();

    res.json({ message: "User deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

route.get("/total-cost/:id", async (req, res) => {
  try {
    const carRentalId = req.params.id;

    const result = await Rentals.aggregate("TotalCost", "SUM", {
      where: {
        carRental_id: carRentalId,
        RentalStatus: 'Complete',
      },
      plain: false,
    });

    if (result.length > 0 && result[0].hasOwnProperty("SUM")) {
      const sumTotalCost = result[0].SUM;
      res.json({ sumTotalCost });
    } else {
      res.json({ sumTotalCost: 0 });
    }
  } catch (error) {
    console.error("Error calculating sum of total cost:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

route.get("/:rental_id", async (req, res) => {
  try {
    const carRentalId = req.params.rental_id;

    const carRental = CarRental.findByPk(carRentalId);

    if (!carRental) {
      res.status(404).json({ message: "Car-Rental Not Found" });
    }

    const rentalDetail = await carRentalDetail(carRentalId);
    const rentalReview = await sumOfRentalReviews(carRentalId);

    const responseData = {
      rentalDetail,
      rentalReview,
    };

    res.json(responseData);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

route.get("/history/:rental_id", async (req, res) => {
  const id = req.params.rental_id;
  try {
    const historyRental = await Rentals.findAll({
      where: {
        carRental_id: id,
      },
      order: [["createdAt", "DESC"]],
    });

    const carIds = historyRental.map((rental) => rental.car_idcar);

    const cars = await Cars.findAll({
      attributes: ["plate", "car_id", "make", "model"],
      where: {
        car_id: carIds,
      },
      include: [
        {
          model: CarImages,
          attributes: ["imageURL", "Caption"],
          limit: 2,
        },
      ],
    });

    const mappedResult = historyRental.map((rental) => {
      const car = cars.find((c) => c.car_id === rental.car_idcar);
      return {
        rental,
        car,
      };
    });

    res.json(mappedResult);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

route.put("/:id",uploadImage.single('profileImage'), async (req, res) => {
  const { id } = req.params;

  try {
    const carRental = await CarRental.findByPk(id);

    if (!carRental) {
      return res.status(404).json({ error: "CarRental not found" });
    }

    carRental.fname = req.body.fname || carRental.fname;
    carRental.lname = req.body.lname || carRental.lname;
    carRental.phone = req.body.phone || carRental.phone;
    carRental.email = req.body.email || carRental.email;
    carRental.rental_name = req.body.rental_name || carRental.rental_name;
    carRental.location = req.body.location || carRental.location;

    if (req.file) {
      carRental.profileURL = req.file.filename;
    }

    await carRental.save();

    return res.status(200).json({ message: "CarRental updated successfully" , carRental});
  } catch (error) {
    console.error("Error updating CarRental:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = route;
