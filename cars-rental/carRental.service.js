const CarRental = require('./carRental.model');
const Reviews = require('../feedback/review.model');
const Cars = require('../cars/car.model');
const { sequelize } = require('../config/dbConfig');

const carRentalDetail = async(carRentalID)=>{

    const rental = await CarRental.findByPk(carRentalID,{
      attributes: ['id_rental', 'rental_name', 'profileURL']
    });

    if(!rental) {
        throw new Error ('Car Rental Not Found');
    }

    return rental;
}

const sumOfRentalReviews = async (carRentalOwnerId) => {
  try {
    const result = await Cars.findAll({
      where: { car_rental_id_rental: carRentalOwnerId },
      attributes: ['car_id'],
      include: [
        {
          model: Reviews,
          attributes: [
            [sequelize.fn('SUM', sequelize.col('rating')), 'totalRating'],
            [sequelize.fn('COUNT', sequelize.col('id')), 'reviewCount']
          ],
        },
      ],
      group: ['Cars.car_id'],
      raw: true,
    });

    const totalRatingSum = result.reduce((sum, row) => sum + parseFloat(row['car_reviews.totalRating'] || 0), 0);
    const reviewCountSum = result.reduce((sum, row) => sum + parseInt(row['car_reviews.reviewCount'] || 0), 0);

    const averageRating = totalRatingSum / reviewCountSum;

    return {averageRating , reviewCountSum};

  } catch (error) {
    console.error('Error calculating total rating:', error);
  }
};

module.exports = { carRentalDetail, sumOfRentalReviews };