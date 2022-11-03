const cloudinary = require("cloudinary").v2;

cloudinary.config({
  cloud_name: "goodycodes",
  api_key: "323819747951733",
  api_secret: "o9ElrZBG46kuO7stpPkvpNERGbI",
});

module.exports = cloudinary;
