const express = require("express");
const router = express.Router();

const {
  createAdvocate,
  getAdvocates,
  getAdvocate,
  updateAdvocate,
  deleteAdvocate,
} = require("../controller/advocatesController");

const upload = require("../utils/multer");

router.route("/").get(getAdvocates);
router.route("/create").post(upload, createAdvocate);
router.route("/:id").get(getAdvocate);
router.route("/:id").patch(updateAdvocate);
router.route("/:id").delete(deleteAdvocate);

module.exports = router;
