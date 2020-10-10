import axios from "axios";
import { API_URL } from "../constants/backend";

const Axios = axios.create({
    // baseURL: API_URL
    // baseURL: "http://3.7.173.1:8080"
    baseURL: "http://0cac007ec5be.ngrok.io"
});

export default Axios;
