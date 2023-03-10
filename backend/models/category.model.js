const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const schema = new Schema({
  name: { type: String, required: true },
  cpu: [{ text: { type: String } }],
});

const Category = mongoose.model("Category", schema);

module.exports = Category;
