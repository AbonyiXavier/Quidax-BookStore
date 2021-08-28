import {
  successfulResponse,
  createdResponse,
  badRequestResponse,
  serverErrorResponse,
} from '../helper/response';

import { createUser, loginUser, refreshUserToken } from '../services/user/user.service'

export default class userController {
  static async registerUsers(request, response) {
    try {
      const { full_name, email, password } = request.body;
      const { status, message, data } = await createUser(
        full_name,
        email,
        password
      );

      if (!status) {
        return badRequestResponse({
          response,
          message,
        });
      }

      response.cookie('accessToken', data.token);

      return createdResponse({
        response,
        message,
        data,
      });
    } catch (error) {
      console.log('err', error);
      return serverErrorResponse({
        response,
        message: 'something went wrong',
      })
    }
  }

  static async login(request, response) {
    try {
      const { email } = request.body;

      const { status, message, data } = await loginUser(email);

      if (!status) {
        return badRequestResponseponse({
          response,
          message,
        });
      }

      response.cookie('accessToken', data.token);

      return successfulResponse({
        response,
        message,
        data,
      });
    } catch (error) {
      console.log('err', error);
      return serverErrorResponse({
        res,
        message: 'something went wrong',
      });
    }
  }

}
