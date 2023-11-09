const Cars = require("./car.model");
const CarDocument = require("./carDocument.model");
const CarImage = require("./carImage.model");
const Rentals = require("../Rentals/rentals.model");
const carRental = require("../cars-rental/carRental.model");
const { Op, where } = require("sequelize");

const getAvailabilityCar = async (pickupDate, returnDate, location) => {
  const availableCars = await Cars.findAll({
    include: [
      {
        model: Rentals,
        required: false,
        where: {
          [Op.and]: [
            {
              [Op.or]: [
                {
                  [Op.and]: [
                    { RentalEndDate: { [Op.gt]: pickupDate } },
                    { RentalStartDate: { [Op.lt]: pickupDate } },
                  ],
                },
                {
                  [Op.and]: [
                    { RentalStartDate: { [Op.lt]: returnDate } },
                    { RentalEndDate: { [Op.gt]: returnDate } },
                  ],
                },
                {
                  [Op.and]: [
                    { RentalStartDate: { [Op.gte]: pickupDate } },
                    { RentalEndDate: { [Op.lte]: returnDate } },
                  ],
                },
              ],
            },
            {
              [Op.or]: [
                { RentalStatus: { [Op.notIn]: ["Cancel", "Return", "Complete"] } },
                { RentalStatus: { [Op.eq]: null } },
              ],
            },
          ],
        },
      },
      {
        model: carRental,
        attributes: [ "rental_name","profileURL" ],
      },
      {
        model: CarImage,
        attributes: ["imageURL", "Caption"],
      },
    ],
    where: {
      "$Rentals.RentalEndDate$": {
        [Op.or]: [
          { [Op.lt]: pickupDate },
          { [Op.gte]: returnDate },
          { [Op.eq]: null },
        ],
      },
      "$Rentals.RentalStartDate$": {
        [Op.or]: [{ [Op.gte]: returnDate }, { [Op.eq]: null }],
      },
      status : true,
    },
  });
  
  if (!availableCars) {
    throw new Error("Car Not Found!");
  }

  return availableCars;
};

const getDetailCar = async (car_id) => {
  const car = await Cars.findOne({
    where: {
      car_id: car_id,
    },
  });

  if (!car) {
    throw new Error("Car Not Found!");
  }

  return car;
};

const getListImageCar = async (car_id) => {
  const images = await CarImage.findAll({
    where: {
      carId: car_id,
    },
  });

  if (!images || images.length === 0) {
    throw new Error("Image Not Found!");
  }

  return images;
};

const getListDocumentCar = async (car_id) => {
  const images = await CarDocument.findAll({
    where: {
      carId: car_id,
    },
  });

  if (!images || images.length === 0) {
    throw new Error("Document Not Found!");
  }

  return images;
};


const createCar = async (carDetails, listImages, listDocument) => {
  const newCar = await Cars.create({
    model: carDetails.model,
    make: carDetails.make,
    color: carDetails.color,
    fuel_type: carDetails.fuel_type,
    seat: carDetails.seat,
    plate: carDetails.plate,
    transmission: carDetails.transmission,
    description: carDetails.description,
    feature: carDetails.feature,
    rentalRate: carDetails.rentalRate,
    car_rental_id_rental: carDetails.car_rental_id_rental,
    status: carDetails.status,
    type : carDetails.type,
    location : carDetails.location
  });

  const imageUrls = [];
  const documentImageUrls = [];

  if (listImages) {
    for (const file of listImages) {
      await CarImage.create({
        imageURL: file.filename,
        carId: newCar.car_id,
      });

      imageUrls.push(file.filename);
    }
  }

  if (listDocument) {
    for (const file of listDocument) {
      await CarDocument.create({
        ImageURL: file.filename,
        carId: newCar.car_id,
        documentType: "Test",
      });

      documentImageUrls.push(file.filename);
    }
  }

  return { newCar, imageUrls, documentImageUrls };
};

const getListMerchantCar = async (id)=>{
  const listCar = await Cars.findAll({
    where:{
      car_rental_id_rental:id,
    },
    attributes:['car_id','model','make','plate','description','status'],
    include:[
      {
        model: CarImage,
        attributes: ["imageURL", "Caption"],
      },
    ]  
  }
  )

  return listCar;
}

module.exports = {
  getDetailCar,
  getAvailabilityCar,
  getListImageCar,
  createCar,
  getListMerchantCar,
  getListDocumentCar
};
