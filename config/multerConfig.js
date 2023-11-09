const multer = require('multer');

const storageImage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, './uploads');
    },
    filename: (req, file, cb) => {
      cb(null, Date.now() + '-' + file.originalname);
    },
  });

  function generateImageUrl(filename) {
    // Assuming your server is running on localhost:3000 and serving images from '__dirname/uploads/carImage/'
    return `${__dirname}/uploads/carImage/${filename}`;
}


const uploadImage = multer({ storage: storageImage });

module.exports = { uploadImage ,generateImageUrl };
