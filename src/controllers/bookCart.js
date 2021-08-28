import Cart from "../Models/bookCart";
import Book from "../Models/book";

import {
  successfulResponse,
  serverErrorResponse,
  createdResponse,
  badRequestResponse,
} from "../helper/response";

export default class bookCartController {
  static async addBookToCart(request, response) {
    try {
      const { bookId, quantity } = request.body;

      const userId = request.user.user._id;

      let cart = await Cart.findOne({ userId });

      let bookDetail = await Book.findById(bookId);
      if (!bookDetail) {
        return badRequestResponse({
          response,
          message: "Invalid book id",
        });
      }

      if (cart) {
        //cart exists for user
        let itemIndex = cart.items.findIndex((p) => p.bookId == bookId);
        if (itemIndex > -1) {
          //book exists in the cart, update the quantity
          let productItem = cart.items[itemIndex];
          productItem.quantity = quantity;
          cart.items[itemIndex] = productItem;
        } else {
          //book does not exists in cart, add new item
          cart.items.push({
            bookId,
            quantity,
            price: bookDetail.price,
            total: parseInt(bookDetail.price * quantity),
          });
        }
        cart = await cart.save();
      } else {
        //no cart for user, create new cart
        const newCart = await Cart.create({
          userId,
          items: [
            {
              bookId,
              quantity,
              price: bookDetail.price,
              total: parseInt(bookDetail.price * quantity),
            },
          ],
        });

        return createdResponse({
          response,
          message: "Book added successfully",
          data: newCart,
        });
      }
    } catch (error) {
      console.log("err", error);
      return serverErrorResponse({
        response,
        message: "something went wrong",
      });
    }
  }
}
