import {
  successfulResponse,
  serverErrorResponse,
} from "../helper/response";

import Review from "../Models/review";
import Book from "../Models/book";

export default class reviewController {
  static async reviewBook(request, response) {
    try {
      const { body, rating } = request.body;
      const { id } = request.params;

      const bookRating = await Review.create({
        body,
        rating,
        ratedBy: request.user.user._id,
        bookId: id,
      });

      await Book.updateOne({ $push: { reviews: bookRating._id } });

      return successfulResponse({
        response,
        message: "Reviews added successfully",
        data: bookRating,
      });
    } catch (error) {
      console.log("err", error);
      return serverErrorResponse({
        response,
        message: "something went wrong",
      });
    }
  }

  static async fetchBookReview(request, response) {
    try {
      const { id } = request.params;

      const review = await Review.find({
        bookId: id,
      })
        .populate("ratedBy")
        .populate("bookId")
        .exec();

      return successfulResponse({
        response,
        message: "Reviews fetched successfully",
        data: review,
      });
    } catch (error) {
      console.log("err", error);
      return serverErrorResponse({
        response,
        message: "something went wrong",
      });
    }
  }
}
