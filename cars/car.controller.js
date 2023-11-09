const express = require("express");
const Cars = require("./car.model");
const CarDocument = require("./carDocument.model");
const { uploadImage } = require("../config/multerConfig");
const CarImage = require("./carImage.model");
const route = express.Router();
const {
  carRentalDetail,
  sumOfRentalReviews,
} = require("../cars-rental/carRental.service");
const {
  getDetailCar,
  getAvailabilityCar,
  getListImageCar,
  createCar,
  getListMerchantCar,
  getListDocumentCar,
} = require("./car.service");
const {
  getCarReview,
  getAverageCarReview,
} = require("../feedback/review.service");

route.get("/car/:car_id", async (req, res) => {
  try {
    const car = await getDetailCar(req.params.car_id);
    const listImage = await getListImageCar(req.params.car_id);
    const carReview = await getCarReview(req.params.car_id);
    const rentalDetail = await carRentalDetail(car.car_rental_id_rental);
    const rentalReview = await sumOfRentalReviews(car.car_rental_id_rental);
    const documentImage = await getListDocumentCar(req.params.car_id);

    res.status(200).json({
      car,
      listImage,
      carReview,
      rental: { rentalReview, rentalDetail },
      documentImage,
    });
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
});

route.get("/car/merchant/:merchant_id", async (req, res) => {
  try {
    const car = await getListMerchantCar(req.params.merchant_id);
    res.status(200).json({
      car,
    });
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
});

route.get("/list-car", async (req, res) => {
  const cars = await Cars.findAll({
    where: {},
  });
  res.json(cars);
});

route.get("/list-availability", async (req, res) => {
  const pickupDate = req.query.pickupDate;
  const returnDate = req.query.returnDate;

  try {
    const availableCars = await getAvailabilityCar(pickupDate, returnDate);

    const carsWithReviews = await Promise.all(
      availableCars.map(async (car) => {
        const carWithReviews = car.toJSON();
        carWithReviews.reviews = await getAverageCarReview(car.car_id);
        return carWithReviews;
      })
    );

    res.json(carsWithReviews);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
});

route.get("/car/images/:car_id", async (req, res) => {
  const car_id = req.params.car_id;
  try {
    const images = await getListImageCar(car_id);
    res.json(images);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
});

route.get("/car-document/:car_id", async (req, res) => {
  try {
    const documentData = await CarDocument.findAll({
      where: {
        carId: req.params.car_id,
      },
    });

    // If there are no images, return a 404 Not Found response
    if (!documentData || documentData.length === 0) {
      return res
        .status(404)
        .json({ error: "No Document found for the specified car" });
    }

    res.json(documentData);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

route.post(
  "/car",
  uploadImage.fields([
    { name: "carImages", maxCount: 7 },
    { name: "documentImages", maxCount: 5 },
  ]),
  async (req, res) => {
    const listImages = req.files.carImages;
    const listDocument = req.files.documentImages;
    const { carDetails } = JSON.parse(req.body.carDetails);

    try {
      const { newCar, imageUrls, documentImageUrls } = await createCar(
        carDetails,
        listImages,
        listDocument
      );

      res.status(201).json({
        message: "Car created successfully",
        newCar,
        imageUrls,
        documentImageUrls,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }
);

route.put(
  "/car/:car_id",
  uploadImage.fields([
    { name: "carImages", maxCount: 7 },
    { name: "documentImages", maxCount: 5 },
  ]),
  async (req, res) => {
    const updateCars = JSON.parse(req.body.carDetails);
    const carImages = req.files.carImages;
    const documentImages = req.files.documentImages;

    try {
      const car = await Cars.findByPk(req.params.car_id);

      if (!car) {
        return res.status(404).json({ message: "Car not found" });
      }

      if (carImages && carImages.length > 0) {
        await CarImage.destroy({
          where: {
            carId: car.car_id,
          },
        });

        const newImages = carImages.map((image) => ({
          imageURL: image.filename,
          carId: car.car_id,
        }));

        await CarImage.bulkCreate(newImages);
      }

      if (documentImages && documentImages.length > 0) {
        await CarDocument.destroy({
          where: {
            carId: car.car_id,
          },
        });

        const newImages = documentImages.map((image) => ({
          ImageURL: image.filename,
          carId: car.car_id,
          documentType: "test",
        }));

        await CarDocument.bulkCreate(newImages);
      }

      Object.keys(updateCars).forEach((property) => {
        car[property] = updateCars[property];
      });

      await car.save();

      res.json(car);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  }
);

route.delete("/car/:car_id", async (req, res) => {
  const carRentalID = req.query.carRentalID;
  const carID = req.query.carID;

  await Cars.destroy({
    where: {
      car_rental_id_rental: carRentalID,
      car_id: carID,
    },
  });
  res.json({ message: "Car Deleted" });
});

module.exports = route;
