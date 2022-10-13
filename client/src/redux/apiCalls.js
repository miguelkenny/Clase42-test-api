import { loginSuccess, loginFailure, loginStart, registerSucces } from "./userRedux"
/* import { publicRequest } from "../requestMethods" */
import axios from "axios"

export const login = async (dispatch, user) => {
    dispatch(loginStart())
    try {
        const res = await axios.post("http://localhost:5000/api/auth/login", user)
        dispatch(loginSuccess(res.data))
    } catch (error) {
        dispatch(loginFailure())
    }
}

export const register = async (dispatch, data) => {
    try {
        
        const res = await axios.post("http://localhost:5000/api/auth/register", data)
        
        dispatch(registerSucces(res.data))

    } catch (error) {
        console.log(error);
    }
}