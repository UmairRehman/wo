// export const AuthTypes = {
//     Login: 'LOGIN',
//     PhoneVarification: 'PHONE_VARIFICATION',
//     SignUp: 'SIGNUP',
//     ForgetPassword: 'FORGET_PASSWORD',
//     emailVarify:'EMAIL_VARIFY'
// }

import { notification } from "antd";
import {
  list as listUsers,
  create as createUser,
  update as updateUser,
  remove as removeUser,
  verification
} from "../services/apiInteraction";

const namespace = "users";

const list = () => {
  return async (dispatch) => {
    try {
      dispatch({ type: "SET_LOADING_USER", payload: true });
      let data = await listUsers({ module: namespace });
      dispatch({ type: "LIST_USER", payload: data });
    } catch (err) {
      dispatch({ type: "SET_LOADING_USER", payload: false });
      notification.error({ message: err.message });
    }
  };
};

// const phoneVerification = () => {
//     return async (dispatch) =>{
//         try {
//             dispatch({ type: "SET_LOADING_USER", payload: true });
//             let data = await phoneVerification({payload})
//             dispatch({ type: "SET_LOADING_USER", payload: false });
//         } catch (error) {
//             dispatch({ type: "SET_LOADING_USER", payload: false });
//         }
//     }
// };