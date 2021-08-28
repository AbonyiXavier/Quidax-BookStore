import Book from "../../Models/book";

export const fectchBook = async (id) => {
  const book = await Book.findOne({ _id: id })
    .populate("createdBy")
    .populate("reviews", "rating")
    .exec();
  if (!book) {
    return {
      status: false,
      message: "Book id does not exist.",
    };
  }
  return {
    status: true,
    message: "Book fetched successfully!",
    data: book,
  };
};
