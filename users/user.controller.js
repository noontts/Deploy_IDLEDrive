const express = require("express");
const { Op } = require("sequelize");
const route = express.Router();
const User = require("./user.model");
const DriverDocument = require("./driverDocument.model");
const { uploadImage } = require("../config/multerConfig");

//get user by ID
route.get("/:userId", async (req, res) => {
  try {
    const userId = req.params.userId;
    const user = await User.findByPk(userId);

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const driverDocuments = await DriverDocument.findAll({
      where: {
        user_id: userId,
      },
    });

    res.status(200).json({ user, driverDocuments });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Create a new user
route.post("/", async (req, res) => {
  try {
    const { username, email, password, FirstName, LastName, Birth, phone } =
      req.body;

    if (!username || !email || !password) {
      return res.status(400).json({ error: "All fields are required" });
    }

    const existingUser = await User.findOne({
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
    const newUser = await User.create({
      username,
      email,
      password,
      FirstName,
      LastName,
      Birth,
      phone,
    });

    res
      .status(201)
      .json({ message: "User registered successfully", user: newUser });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Login user
route.post("/auth/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if the required fields are present
    if (!email || !password) {
      return res.status(400).json({ error: "Email and password are required" });
    }

    // Find user by email
    const user = await User.findOne({
      where: { email: email },
    });

    if (!user || user.password !== password) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    // At this point, authentication is successful
    // You may generate a JWT token and send it back to the client

    res.json({ message: "Login successful", user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Update user by ID
route.put("/:userId", uploadImage.single("profileImage"), async (req, res) => {
  try {
    const { email, FirstName, LastName, Birth, phone } = req.body; // เพิ่มคอลัมน์ใหม่ตรงนี้
    const userId = req.params.userId;

    if (!email) {
      return res.status(400).json({ error: "All fields are required" });
    }

    const user = await User.findByPk(userId);

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    user.email = email;
    user.FirstName = FirstName;
    user.LastName = LastName;
    user.Birth = Birth;
    user.phone = phone;

    if (req.file) {
      user.profileURL = req.file.filename;
    }

    await user.save();

    res.json({ message: "User updated successfully", user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Delete user by ID
route.delete("/:userId", async (req, res) => {
  try {
    const userId = req.params.userId;

    // Find user by ID
    const user = await User.findByPk(userId);

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

// Get all driver documents for a specific user
route.get("/:userId/driver-documents", async (req, res) => {
  try {
    const userId = req.params.userId;
    const user = await User.findByPk(userId);

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Query for driver documents associated with the user
    const driverDocuments = await DriverDocument.findAll({
      where: {
        user_id: userId, // Filter by user_id
      },
    });

    res.status(200).json(driverDocuments);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

route.put(
  "/driver/:userID",
  uploadImage.array("Document"),
  async (req, res) => {
    try {
      const { email, FirstName, LastName, phone } = req.body;

      console.log("file-------", req.files);
      const userId = req.params.userID;
      const user = await User.findByPk(userId);

      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }

      user.FirstName = FirstName;
      user.LastName = LastName;
      user.phone = phone;
      user.email = email;

      await user.save();

      const listDocument = req.files;

      if (listDocument.length > 0) {
        const identificationCard = listDocument[0];
        const driverLicense = listDocument[1];

        const identificationCardRecord = await DriverDocument.create({
          Type: "Identification Card",
          ImageURL: identificationCard.filename,
          Caption: "Identification Card",
          user_id: userId,
        });

        const driverLicenseRecord = await DriverDocument.create({
          Type: "Driver's License",
          ImageURL: driverLicense.filename,
          Caption: "Driver's License",
          user_id: userId,
        });

        res.status(200).json({
          message: "User and documents updated successfully",
          user: user.toJSON(),
          identificationCard: identificationCardRecord.toJSON(),
          driverLicense: driverLicenseRecord.toJSON(),
        });
      } else {
        res.status(200).json({
          message: "User information updated successfully",
          user: user.toJSON(),
        });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }
);

route.put(
  "/driver/document/:userID",
  uploadImage.fields([
    { name: "IdCardDocument", maxCount: 1 },
    { name: "LicenseDocument", maxCount: 1 },
  ]),
  async (req, res) => {
    try {
      const userId = req.params.userID;
      const user = await User.findByPk(userId);

      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }

      const idCardDocument = req.files['IdCardDocument'] ? req.files['IdCardDocument'][0] : null;
      const licenseDocument = req.files['LicenseDocument'] ? req.files['LicenseDocument'][0] : null;

      if (idCardDocument) {
        await DriverDocument.destroy({
          where: { user_id: userId, Type: "Identification Card" },
        });
      }

      if (licenseDocument) {
        await DriverDocument.destroy({
          where: { user_id: userId, Type: "Driver's License" },
        });
      }

      const documents = [];

      if (idCardDocument) {
        const identificationCardRecord = await DriverDocument.create({
          Type: "Identification Card",
          ImageURL: idCardDocument.filename,
          Caption: "Identification Card",
          user_id: userId,
        });
        documents.push({
          type: "Identification Card",
          record: identificationCardRecord.toJSON(),
        });
      }

      if (licenseDocument) {
        const driverLicenseRecord = await DriverDocument.create({
          Type: "Driver's License",
          ImageURL: licenseDocument.filename,
          Caption: "Driver's License",
          user_id: userId,
        });
        documents.push({
          type: "Driver's License",
          record: driverLicenseRecord.toJSON(),
        });
      }
      
      res.status(200).json({
        message: "Documents uploaded successfully",
        documents: documents,
      });

    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }
);

route.get("/driver/:userID", async (req, res) => {
  const { userID } = req.params;

  try {
    const user = await User.findByPk(userID);
    const driverDocuments = await DriverDocument.findAll({
      where: { user_id: userID },
    });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    res.status(200).json({
      user: user.toJSON(),
      driverDocuments: driverDocuments.map((doc) => doc.toJSON()),
    });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = route;
