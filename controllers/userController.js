const Category = require("../models/category")

const userController = {

  createCategory: async (req, res) => {
    let parent = req.body.parent ? req.body.parent : null;
    const newCategory = new Category({ name: req.body.name, parent })
    try {
      await newCategory.save()

      buildAncestors(newCategory._id, parent)

      res.status(201).send({ response: `Category ${newCategory._id}` })
    } catch (err) {
      res.status(500).send(err)
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
        console.log(result, "mmmmmmmmmmmmmmmmmmmmm")
      res.status(201).send({ "status": "success", result: result });
    } catch (err) {
      res.status(500).send(err);
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