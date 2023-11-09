const express = require("express");
const route = express.Router();
const routesService = require("./routes.service");
const { uploadImage } = require('../config/multerConfig');

// Get all routes
route.get("/routes", async (req, res) => {
  try {
    const routes = await routesService.getAllRoutes();
    res.status(200).json(routes);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Get all routes for a specific user by user ID
route.get("/users/routes/:userID", async (req, res) => {
  try {
    const userID = req.params.userID;
    const routes = await routesService.getRoutesByUserID(userID);

    if (!routes) {
      return res.status(404).json({ error: "No routes found for the user" });
    }

    res.status(200).json(routes);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Create a new route for a specific user by user ID
route.post("/users/routes/:userID", uploadImage.array('routeImages', 6) , async (req, res) => {
  try {
    const userID = req.params.userID;
    const routeData = JSON.parse(req.body.routeData);
    const routeImages = req.files;

    if (!routeData) {
      return res.status(400).json({ error: "Route data is required" });
    }

    // Add user_id to the route data
    routeData.user_id = userID;

    const { routes, routeImagesURL } = await routesService.createRoute(routeData, routeImages);

    res
      .status(201)
      .json({ message: "Route created successfully", route: routes, routeIMG : routeImagesURL });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Get route by ID
route.get("/routes/:routeId", async (req, res) => {
  try {
    const routeId = req.params.routeId;
    const route = await routesService.getRouteById(routeId);

    if (!route) {
      return res.status(404).json({ error: "Routes not found" });
    }

    res.status(200).json(route);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Update a route by route ID
route.put("/routes/:routeID", async (req, res) => {
  try {
    const routeID = req.params.routeID;
    const routeData = req.body;

    if (!routeData) {
      return res.status(400).json({ error: "Route data is required" });
    }

    const existingRoute = await routesService.getRouteById(routeID);

    if (!existingRoute) {
      return res.status(404).json({ error: "Route not found" });
    }

    // Update the existing route with the new data
    const updatedRoute = await routesService.updateRoute(routeID, routeData);

    res.json({ message: "Route updated successfully", route: updatedRoute });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Delete route by ID
route.delete("/routes/:routeId", async (req, res) => {
  try {
    const routeId = req.params.routeId;
    await routesService.deleteRoute(routeId);
    res.json({ message: "Routes deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = route;
