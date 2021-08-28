import {
  successfulResponse,
  createdResponse,
  badRequestResponse,
  serverErrorResponse,
} from "../helper/response";

import Book from "../Models/book";
import { fectchBook } from "../services/book/book.service";

export default class bookController {
  static async addBook(request, response) {
    try {
      const { title, author, description, author_year, price, genre } =
        request.body;

      const bookNameExist = await Book.findOne({ title });

      if (bookNameExist) {
        return badRequestResponse({
          response,
          message: "Book title already exist.",
        });
      }

      const bookData = await Book.create({
        title,
        author,
        description,
        author_year,
        photo: request.file.location,
        price,
        genre,
        stockQuantity: request.body.stockQuantity
          ? request.body.stockQuantity
          : 1,
        featured: request.body.featured ? request.body.featured : false,
        createdBy: request.user.user._id,
      });

      return createdResponse({
        response,
        message: "Book added successfully",
        data: bookData,
      });
    } catch (error) {
      console.log("err", error);
      return serverErrorResponse({
        response,
        message: "something went wrong",
      });
    }
  }

  static async getBook(request, response) {
    try {
      const { id } = request.params;
      const { status, message, data } = await fectchBook(id);

      if (!status) {
        return badRequestResponse({
          response,
          message,
        });
      }

      return successfulResponse({
        response,
        message,
        data,
      });
    } catch (error) {
      console.log("err", error);
      return serverErrorResponse({
        response,
        message: "something went wrong",
      });
    }
  }

  static async listBooks(request, response) {
    try {
        let { page, limit } = request.query;
        page = page < 1 ? 1 : page;
        limit = 10;

      // get total documents in the Products collection
      let count = await Book.countDocuments();
      let totalPages = Math.ceil(count / limit);
      page = page > totalPages ? totalPages : page;

      const book = await Book.find({ __v: 0 })
        .limit(limit * 1)
        .skip((page - 1) * limit)
        .populate("createdBy")
        .populate("reviews", "rating")
        .exec();

      for (const el of book) {
        if (el.reviews.length > 0) {
          let sum = el.reviews.reduce((total, review) => {
            return total + review.rating;
          }, 0);

          let bookRating = sum / el.reviews.length;

          return successfulResponse({
            response,
            message: "Book fetched successfully",
            data: book,

            meta: {
              totalPages: totalPages,
              currentPage: page,
              totalProducts: count,
              avaerageRating: bookRating.toFixed(1),
            },
          });
        }
      }
    } catch (error) {
      console.log("err", error);
      return serverErrorResponse({
        response,
        message: "something went wrong",
      });
    }
  }
  static async searchBooks(request, response) {
    try {
      let { search, page, limit } = request.query;
      page = page < 1 ? 1 : page;
      limit = 10;

      const searchQueries = {
        $and: [
          {
            $or: [
              {
                title: { $regex: new RegExp(search), $options: "i" },
              },
              {
                author: { $regex: new RegExp(search), $options: "i" },
              },
              {
                genre: { $regex: new RegExp(search), $options: "i" },
              },
              {
                author_year: { $regex: new RegExp(search), $options: "i" },
              },
            ],
          },
        ],
      };
      // get total documents in the Products collection
      let count = await Book.countDocuments();
      let totalPages = Math.ceil(count / limit);
      page = page > totalPages ? totalPages : page;

      const book = await Book.find(searchQueries, { __v: 0 })
        .limit(limit * 1)
        .skip((page - 1) * limit)
        .populate("createdBy")
        .populate("reviews", "rating")
        .exec();

        return successfulResponse({
            response,
            message: "Book fetched successfully",
            data: book,

            meta: {
              totalPages: totalPages,
              currentPage: page,
              totalProducts: count,
            },
          });
    } catch (error) {
      console.log("err", error);
      return serverErrorResponse({
        response,
        message: "something went wrong",
      });
    }
  }

  static async updateBook(request, response) {
    try {
      await Book.findOneAndUpdate(
        {
          _id: request.params.id,
        },
        {
          $set: {
            title: request.body.title,
            author: request.body.author,
            description: request.body.description,
            photo: request.file.location,
            price: request.body.price,
            stockQuantity: request.body.stockQuantity,
            genre: request.body.genre,
            author_year: request.body.author_year,
            featured: request.body.featured,
          },
        },
        {
          upsert: true,
        }
      );

      return successfulResponse({
        response,
        message: "Book updated successfully",
      });
    } catch (error) {
      console.log("err", error);
      return serverErrorResponse({
        response,
        message: "something went wrong",
      });
    }
  }

  static async likeBook(request, response) {
    try {
      const { id } = request.params;
      const book = await Book.findOne({ _id: id }).populate("createdBy").exec();

      let likeNow = ++book.likes;
      await Book.findOneAndUpdate(
        {
          _id: id,
        },
        {
          $set: { likes: likeNow },
          $push: { likedBy: request.user.user._id },
        },
        {
          new: true,
        }
      );

      return successfulResponse({
        response,
        message: "likes was successfully",
      });
    } catch (error) {
      console.log("err", error);
      return serverErrorResponse({
        response,
        message: "something went wrong",
      });
    }
  }

  static async featuredBook(request, response) {
    try {
      let { limit } = request.query;
      limit = 20;
      const book = await Book.find({ featured: true }).limit(limit);

      return successfulResponse({
        response,
        message: "Featured book fetched successfully",
        data: book,
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
