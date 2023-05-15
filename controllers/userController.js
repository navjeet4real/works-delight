const Category = require("../models/category")
const Media = require("../models/media")
const ffmpeg = require('ffmpeg');

const userController = {
  createCategory: async (req, res) => {
    let parent = req.body.parent ? req.body.parent : null;
    const newCategory = new Category({ name: req.body.name, parent })
    try {
      await newCategory.save()

      buildAncestors(newCategory._id, parent)

      res.status(201).send({ response: `Category ${newCategory._id}` })
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  displayCategory: async (req, res) => {
    try {
      console.log(req.query)
      const result = await Category.find({ slug: req.query.slug })
        .select({
          "_id": false,
          "name": true,
          "ancestors.slug": true,
          "ancestors.name": true
        }).exec();
      res.status(201).send({ "status": "success", result: result });
    } catch (err) {
      return res.status(500).json({ msg: err.message });;
    }
  },
  uploadFile: async (req, res) => {
    try {
      const { name } = req.body;
      let videosPaths = [];

      if (Array.isArray(req.files.videos) && req.files.videos.length > 0) {
        for (let video of req.files.videos) {
          videosPaths.push("/" + video.path);
        }
      }
      try {
        // const convertedVideos = [];
        // for (let videoPath of videosPaths) {
        //   const outputFilePath = videoPath.replace(/\.[^/.]+$/, ".m3u8"); // Create output file path by changing file extension to .m3u8
        //   await ffmpeg(videoPath)
        //     .output(outputFilePath)
        //     .addOption("-hls_time", "10")
        //     .addOption("-hls_list_size", "0")
        //     .addOption("-hls_segment_filename", "%v/media_%d.ts")
        //     .outputOptions("-c:a", "aac")
        //     .outputOptions("-c:v", "h264")
        //     .run();
        //   convertedVideos.push(outputFilePath);
        // }
        const newMedia = await Media.create({
          name,
          videos: videosPaths,
        });

        res.json({ message: "File uploaded successfully", newMedia });
      } catch (error) {
        console.log(error);
        res.status(400).json(error);
      }
    } catch (err) {
      return res.status(500).json({ msg: err.message });;
    }
  },
  getAll: async (req, res) => {
    try {
      const media = await Media.find();

      res.json(media);
    } catch (error) {
      console.log(error);
      res.status(400).json(error);
    }
  },

}

module.exports = userController

const buildAncestors = async (id, parent_id) => {
  let ancest = [];
  try {
    let parent_category = await Category.findOne({ "_id": parent_id }, { "name": 1, "slug": 1, "ancestors": 1 }).exec();
    if (parent_category) {
      const { _id, name, slug } = parent_category;
      const ancest = [...parent_category.ancestors];
      ancest.unshift({ _id, name, slug })
      const category = await Category.findByIdAndUpdate(id, { $set: { "ancestors": ancest } });
    }
  } catch (err) {
    console.log(err.message)
  }
}