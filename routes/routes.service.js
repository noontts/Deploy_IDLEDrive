// routes.service.js
const Routes = require("./routes.model");
const RoutesImages = require("./routesImage.model");

// รับข้อมูลเส้นทางทั้งหมด
const getAllRoutes = async () => {
  const allRoutes = await Routes.findAll({
    attributes: ["id", "name", "time", "length"],
    include: [
      {
        model: RoutesImages,
        attributes: ["imageURL"],
      },
    ],
    where:{
      status: true,
    }
  });
  return allRoutes;
};

// Get all routes for a specific user by user ID
const getRoutesByUserID = async (userID) => {
  return await Routes.findAll({ where: { user_id: userID } });
};

// รับข้อมูลเส้นทางตาม ID
const getRouteById = async (routeId) => {
  return await Routes.findByPk(routeId, {
    include: [
      {
        model: RoutesImages,
        attributes: ["imageURL"],
      },
    ],
  });
};

// สร้างเส้นทางใหม่
const createRoute = async (routeData, routeImages) => {
  const routeImagesURL = [];
  const routes = await Routes.create(routeData);

  if (routeImages) {
    for (const file of routeImages) {
      await RoutesImages.create({
        imageURL: file.filename,
        routes_Id: routes.id,
      });

      routeImagesURL.push(file.filename);
    }
  }

  return { routes, routeImagesURL };
};

// Update route by ID
const updateRoute = async (routeID, routeData) => {
  const existingRoute = await Routes.findByPk(routeID);

  if (!existingRoute) {
    return null; // Return null or handle not found as needed
  }

  for (const key in routeData) {
    existingRoute[key] = routeData[key];
  }

  await existingRoute.save();
  return existingRoute;
};
// ลบเส้นทางตาม ID
const deleteRoute = async (routeId) => {
  const route = await Routes.findByPk(routeId);
  if (route) {
    await route.destroy();
  }
};

module.exports = {
  getAllRoutes,
  getRouteById,
  createRoute,
  updateRoute,
  deleteRoute,
  getRoutesByUserID,
};
