import { config } from "@/utils/config";
import _axios from "axios";

const axios = _axios.create({
  baseURL: config.BACKEND_URL,
  withCredentials: true,
});

export default axios;
