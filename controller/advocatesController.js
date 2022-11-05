const advocatesModel = require("../model/advocatesModel");
const { search } = require("../router/advocatesRouter");
const cloudinary = require("../utils/cloudinary");

const createAdvocate = async (req, res) => {
  try {
    const { username, name, bio, twitter, companies, follower_count } =
      req.body;

    const profile = await cloudinary.uploader.upload(req.file.path);

    const advocate = await advocatesModel.create({
      username,
      name,
      bio,
      twitter,
      companies,
      follower_count,
      profile_pic: profile.secure_url,
      profile_pic_id: profile.public_id,
    });
    res.status(200).json({ message: "Advocate created", data: advocate });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

const getAdvocates = async (req, res) => {
  const page = parseInt(req.query.page);
  const limit = parseInt(req.query.limit);
  const total = parseInt(req.query.total);
  const search = req.query.search || "";
  let sort = req.query.sort || "username";

  const startIndex = (page - 1) * limit;
  const endIndex = page * limit;

  const advocates = {};

  if (endIndex < (await advocatesModel.countDocuments().exec())) {
    advocates.next = {
      page: page + 1,
      limit: limit,
    };
  }

  if (startIndex > 0) {
    advocates.previous = {
      error: false,
      page: page - 1,
      limit: limit,
    };
  }

  req.query.sort ? (sort = req.query.sort.split(",")) : (sort = [sort]);

  let sortBy = {};
  if (sort[1]) {
    sortBy[sort[0]] = sort[1];
  } else {
    sortBy[sort[0]] = "asc";
  }

  try {
    advocates.advocates = await advocatesModel
      .find({ username: { $regex: search, $options: "i" } })
      .sort(sortBy)
      .limit(limit)
      .skip(startIndex)
      .exec();

    const total = await advocatesModel.countDocuments({
      username: { $regex: search, $options: "i" },
    });
    const response = {
      total,
      advocates,
    };
    res.status(200).json({ message: "All advocates found found", response });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

const getAdvocate = async (req, res) => {
  try {
    const advocate = await advocatesModel.findById(req.params.id);
    res.status(200).json({ message: "Single Advocate found", data: advocate });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

const updateAdvocate = async (req, res) => {
  try {
    const { username, name, bio, twitter, companies, follower_count } =
      req.body;

    const advocate = await advocatesModel.findByIdAndUpdate(
      req.params.id,
      {
        username,
        name,
        bio,
        twitter,
        companies,
        follower_count,
      },
      { new: true }
    );
    res.status(200).json({
      message: "An Advocate has been updated",
      data: advocate,
    });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

const deleteAdvocate = async (req, res) => {
  try {
    const advocate = await advocatesModel.findByIdAndRemove(req.params.id);
    res.status(200).json({
      message: "An advocate has been removed from DB",
      data: advocate,
    });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

module.exports = {
  createAdvocate,
  getAdvocates,
  getAdvocate,
  updateAdvocate,
  deleteAdvocate,
};
