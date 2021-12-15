import { notification } from "antd";
import {
  list as listUsers,
  create as createUser,
  update as updateUser,
  remove as removeUser,
} from "../services/apiInteraction";

const namespace = "users";

export const list = () => {
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

export const create = (data) => {
  return async (dispatch) => {  
    try {
      dispatch({ type: "SET_LOADING_USERS", payload: true });
      await createUser({ module: namespace, data });
        dispatch({ type: "SET_LOADING_USERS", payload: false });
      notification.success({ message: "User Creation Successful" });
    } catch (err) {
      dispatch({ type: "SET_LOADING_USERS", payload: false });
      notification.error({ message: err.message });
    }
  };
};

export const update = (data) => {
  return async (dispatch) => {
    try {
      dispatch({ type: "SET_LOADING_USER", payload: true });
      await updateUser({ module: namespace, data })
      notification.success({ message: 'User Updated Successful' })
      dispatch({ type: "SET_LOADING_USER", payload: false });
    }
    catch (err) {
      dispatch({ type: "SET_LOADING_USER", payload: false });
      notification.error({ message: err.message })
    }
  };
};

export const remove = (data) => {
  return async (dispatch) => {
    try {
      dispatch({ type: "SET_LOADING_USERS", payload: true });
      await removeUser({ module: namespace, data });
      notification.success({ message: "User Removed Successful" });
      dispatch({ type: "SET_LOADING_USERS", payload: false });
    } catch (err) {
      dispatch({ type: "SET_LOADING_USERS", payload: false });
      notification.error({ message: err.message });
    }
  };
};
