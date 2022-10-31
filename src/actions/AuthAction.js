import * as AuthApi from "../api/AuthRequest";
import { toast } from "react-toastify";

export const logIn = (formData) => async (dispatch) => {
  dispatch({ type: "AUTH_START" });
  try {
    const { data } = await AuthApi.logIn(formData);
    dispatch({ type: "AUTH_SUCCESS", data: data });
    toast.success("login successfully ");
  } catch (error) {
    console.log(error.response.data);
    toast.error(error.response.data);
    dispatch({ type: "AUTH_FAIL" });
  }
};

export const signUp = (formData) => async (dispatch) => {
  dispatch({ type: "AUTH_START" });
  try {
    const { data } = await AuthApi.signUp(formData);
    dispatch({ type: "AUTH_SUCCESS", data: data });
    toast.success("sign up successfully ");
  } catch (error) {
    console.log(error);
    toast.error(error.response.data);
    dispatch({ type: "AUTH_FAIL" });
  }
};

export const logout = () => async (dispatch) => {
  toast.success("logout is successfully");
  dispatch({ type: "LOG_OUT" });
};
