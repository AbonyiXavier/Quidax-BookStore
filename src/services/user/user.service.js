
import User from "../../Models/user";
import jwtHelper from "../../authService/jwt";
import bcryptHelper from "../../authService/bcrypt";

const { generateToken, refreshToken } = jwtHelper;
const { hashPassword, comparePassword } = bcryptHelper;

export const createUser = async (full_name, email, password) => {  
    try {
      const checkEmail = await User.findOne({ email: email });

      if (checkEmail) {
        return {
          status: false,
          message: 'email already in use.',
        };
      }

      const pwd = await hashPassword(password);

      const userData = await User.create({
        full_name,
        email,
        password: pwd,
      });
  
      const token = await generateToken({ userData });
      const refreshedToken = await refreshToken({ userData });
   
      return {
        status: true,
        message: 'User created successfully!',
        data: {
            userData,
            accessToken: token,
            refreshToken:  refreshedToken
        },
      };
    } catch (error) {
      console.log('error', error);
      return {
        status: false,
        message: 'Something went wrong',
      };
    }
  };

  export const loginUser = async ( email ) => {
    try {
      const user = await User.findOne({ email: email });
      if (!user) {
        return {
          status: false,
          message: 'invalid email and password',
        };
      }
      const token = await generateToken({ user });
      const refreshedToken = await refreshToken({ user });
      
      return {
        status: true,
        message: 'logged in!',
        data: {
            user,
            accessToken: token,
            refreshToken:  refreshedToken
        },
      };
    } catch (error) {
      return {
        status: false,
        message: 'Something went wrong',
      };
    }
    }

