const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const BookSchema = new Schema(
  {
    createdBy: { 
      type: Schema.Types.ObjectId, 
      ref: "User" 
    },
    title: {
      type: String,
      required: true,
    },
    author: {
      type: String,
      required: true,
    },
    author_year: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    photo: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    genre: {
      type: String,
      required: true,
    },
    stockQuantity: {
      type: Number,
      required: true,
      default: 1,
    },
    featured: {
      type: Boolean,
      default: false,
    },
    likedBy: [
      {
        type: String,
      },
    ],
    likes: {
      type: Number,
      default: 0,
    },
    //store the id of the newly created Review
    reviews: [
      {
        type: Schema.Types.ObjectId,
        ref: "Review",
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Book", BookSchema);
