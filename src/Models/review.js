const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ReviewSchema = new Schema({
  body: {
    type: String,
    required: true,
  },
  rating: {
    type: Number,
    required: true,
  },
  bookId: { type: Schema.Types.ObjectId, ref: "Book" },
  ratedBy: { type: Schema.Types.ObjectId, ref: "User" },
});

module.exports = mongoose.model("Review", ReviewSchema);