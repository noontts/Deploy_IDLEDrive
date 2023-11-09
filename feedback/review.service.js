const Car = require("../cars/car.model");
const User = require("../users/user.model");
const CarReview = require('./review.model');
const { Sequelize, Op } = require('sequelize');

const getCarReview = async(car_idcar) =>{
    // ค้นหารถโดยใช้ค่า car_idcar ที่คุณระบุ
    const car = await Car.findByPk(car_idcar);

    if (!car) {
      throw new Error('Car not found!');
    }

    // ค้นหารีวิวที่เกี่ยวข้องกับรถที่คุณพบ
    const carReviews = await CarReview.findAll({
      where: { car_idcar: car_idcar },
      include:[{
        model:User,
        attributes: ['username','profileURL'],
      }]
    });

    const averageRating = await getAverageCarReview(car_idcar);

    return {carReviews, averageRating};
}

const getAverageCarReview = async(car_idcar) =>{
  // ค้นหารถโดยใช้ค่า car_idcar ที่คุณระบุ
  const car = await Car.findByPk(car_idcar);

  if (!car) {
    throw new Error('Car not found!');
  }

  const result = await CarReview.findOne({
    attributes: [
      [Sequelize.fn('AVG', Sequelize.col('rating')), 'averageRating'],
      [Sequelize.fn('COUNT', Sequelize.col('rating')), 'ratingCount'],
    ],
    where: { car_idcar: car_idcar },
  });

  const averageRating = result ? result.get('averageRating') || 0 : 0;
  const ratingCount = result ? result.get('ratingCount') || 0 : 0;

  return {averageRating, ratingCount};
}

module.exports = { getCarReview, getAverageCarReview }