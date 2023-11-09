# Back-End-IdleDrive

# BACK-END IDLEDRIVE


## Table of Contents

- [Car Module](#car-module)
- [Car Rental Module](#car-rental-module)
- [User Authentication Module](#user-authentication-module)
- [Review Module](#review-module)

## Car Module

1. **Get Car Details:**
   - Endpoint: `GET /car/:car_id`
   - Description: Get details of a specific car.

2. **List All Cars:**
   - Endpoint: `GET /list-car`
   - Description: Get a list of all cars.

3. **List Available Cars:**
   - Endpoint: `GET /list-availability`
   - Description: Get a list of available cars for a given date range.

4. **Get Car Images:**
   - Endpoint: `GET /images/:car_id`
   - Description: Get images of a specific car.

5. **Get Car Documents:**
   - Endpoint: `GET /car-document/:car_id`
   - Description: Get documents associated with a specific car.

6. **Create New Car:**
   - Endpoint: `POST /car`
   - Description: Create a new car.

7. **Update Car Details:**
   - Endpoint: `PUT /car/:car_id`
   - Description: Update details of a specific car.

8. **Delete Car:**
   - Endpoint: `DELETE /car/:car_id`
   - Description: Delete a specific car.

## Car Rental Module

1. **Book Rental:**
   - Endpoint: `POST /booking`
   - Description: Book a rental.

2. **List All Rentals:**
   - Endpoint: `GET /booking`
   - Description: Get a list of all rentals.

3. **Update Booking Status:**
   - Endpoint: `PUT /booking/:booking_id`
   - Description: Update the status of a booking.

4. **Get Booking Details:**
   - Endpoint: `GET /booking/:booking_id`
   - Description: Get details of a specific booking.

## User Authentication Module

1. **Register User:**
   - Endpoint: `POST /auth/register`
   - Description: Register a new user.

2. **User Login:**
   - Endpoint: `POST /auth/login`
   - Description: Login for user authentication.

3. **Edit User Details:**
   - Endpoint: `PUT /auth/edit/:userId`
   - Description: Edit user details.

4. **Delete User:**
   - Endpoint: `DELETE /auth/delete/:userId`
   - Description: Delete a user.

5. **Get Total Cost for Car Rental:**
   - Endpoint: `GET /total-cost/:id`
   - Description: Get the total cost of rentals for a car rental.

## Review Module

1. **Get Car Reviews:**
   - Endpoint: `GET /review/:car_idcar`
   - Description: Get reviews for a specific car.

2. **Post Car Review:**
   - Endpoint: `POST /review/:car_idcar`
   - Description: Post a new review for a car.
