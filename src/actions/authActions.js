import { notification } from "antd";

import {

  Login

} from "../services/apiInteraction";

const namespace = "users";

export const LoginUser = (data) => {

  return async (dispatch) => {
    try {
      // dispatch({ type: "LOGIN", payload: true });
      let resultHandle = await Login(data);
      // console.log(resultHandle)

      if (resultHandle.success == true) {

        dispatch({ type: "LOGIN_USER", payload: resultHandle.message });
        // dispatch({ type: "SET_LOADING_USERS", payload: false });
        return resultHandle = {
          success: true,
          message: resultHandle.message
        }
      }

      else {
        // console.log(resultHandle.message);
        return resultHandle = {
          success: false,
          message: resultHandle.message
        }
      }

    } catch (err) {
      dispatch({ type: "SET_LOADING_USERS", payload: false });

      // notification.error({ message: resultHandle });

      console.log(err)
    }
  };
};

export const getLogin = () => {
  return async (dispatch) => {

    let user = dispatch({ type: "GET_LOGIN_USER" });
    if (user) {
      return user
    }
  }
}


