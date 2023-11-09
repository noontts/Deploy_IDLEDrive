const { Op } = require("sequelize");
const Rentals = require("./rentals.model");

const createBooking = async (
  car_idcar,
  RentalStartDate,
  RentalEndDate,
  user_id,
  address,
  TotalCost,
  carRental_id
) => {
  const newRental = await Rentals.create({
    RentalStatus: "Wait for Confirm",
    address,
    RentalStartDate,
    RentalEndDate,
    TotalCost,
    car_idcar,
    user_id,
    carRental_id,
  });

  return newRental;
};

const checkExistingBooking = async (car_idcar, RentalStartDate, RentalEndDate) => {
  const existingBooking = await Rentals.findOne({
    where: {
      car_idcar,
      [Op.and]: [
        {
          [Op.or]: [
            {
              [Op.and]: [
                { RentalStartDate: { [Op.lte]: RentalEndDate } },
                { RentalEndDate: { [Op.gte]: RentalStartDate } },
              ],
            },
            {
              [Op.and]: [
                { RentalStartDate: { [Op.lte]: RentalStartDate } },
                { RentalEndDate: { [Op.gte]: RentalEndDate } },
              ],
            },
            {
              [Op.and]: [
                { RentalStartDate: { [Op.gte]: RentalStartDate } },
                { RentalEndDate: { [Op.lte]: RentalEndDate } },
              ],
            },
          ],
        },
        {
          RentalStatus: {
            [Op.notIn]: ['Cancel', 'Return', 'Complete'],
          },
        },
      ],
    },
  });

  return existingBooking;
};

module.exports = { createBooking, checkExistingBooking };
