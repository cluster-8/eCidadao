import axios from "axios";

export const api = axios.create({
  baseURL: "https://api-ecidadao.herokuapp.com/v1/",
});
