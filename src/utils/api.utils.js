import axios from "axios";

class Api {
  constructor() {
    this.api = axios.create({
      baseURL: "https://clumsy-wig-slug.cyclic.app/"
    });
    this.api.interceptors.request.use(
      (config) => {
        const token = localStorage.getItem("token");
        if (token) {
          config.headers = {
            Authorization: `Bearer ${token}`
          };
        }
        return config;
      },
      (error) => {
        console.log(error);
      }
    );
    this.api.interceptors.response.use(
      (response) => response,
      (error) => {
        if (error.response.status === 401) {
          localStorage.removeItem("token");
          window.location = "/";
        }
        throw error;
      }
    );
  }
  login = async (loginInfo) => {
    try {
      const { data } = await this.api.post("/user/auth/login", loginInfo);
      localStorage.setItem("token", data.token);
    } catch (error) {
      throw error.response.data.msg;
    }
  };
  signUp = async (signUpInfo) => {
    try {
      const { data } = await this.api.post("/user/auth/signup", signUpInfo);
      return data;
    } catch (error) {
      throw error.response.data.msg;
    }
  };
  getUsers = async () => {
    try {
      const { data } = await this.api.get("/users");
      return data;
    } catch (error) {
      console.log(error, `Could not load Users`);
    }
  };
  getDefendants = async () => {
    try {
      const { data } = await this.api.get("defendant");
      return data;
    } catch (error) {
      console.log(error, "Could not load Defendants");
    }
  };
  addDefendant = async (defendatData) => {
    try {
      const { data } = await this.api.post("/defendant", defendatData);
      return data;
    } catch (error) {
      throw error.response.data.msg;
    }
  };
  getOneDefendant = async (id) => {
    try {
      const { data } = await this.api.get(`/defendant/${id}`);
      return data;
    } catch (error) {
      console.log(error, "Could not load Defendant");
    }
  };
  editDefendant = async (defendantData, id) => {
    try {
      const { data } = await this.api.put(`/defendant/${id}`, defendantData);
      return data;
    } catch (error) {
      throw error.response.data.msg;
    }
  };
  deleteDefendant = async (id) => {
    try {
      const { data } = await this.api.delete(`/defendant/${id}`);
      return data;
    } catch (error) {
      throw error.response.data.msg;
    }
  };
}

export default new Api();
