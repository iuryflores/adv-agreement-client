import axios from "axios";

class Api {
  constructor() {
    this.api = axios.create({
      baseURL: "https://clumsy-wig-slug.cyclic.app/",
      //baseURL: "http://localhost:5000/"
    });
    this.api.interceptors.request.use(
      (config) => {
        const token = localStorage.getItem("token");
        if (token) {
          config.headers = {
            Authorization: `Bearer ${token}`,
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
      throw error.response.data.msg;
    }
  };
  getDefendants = async () => {
    try {
      const { data } = await this.api.get("/defendant");
      return data;
    } catch (error) {
      throw error.response.data.msg;
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
      throw error.response.data.msg;
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
  editProcess = async (processData, id) => {
    try {
      const { data } = await this.api.put(`/process/${id}`, processData);
      return data;
    } catch (error) {
      throw error.response.data.msg;
    }
  };
  editDeal = async (dealData, id) => {
    try {
      const { data } = await this.api.put(`/deal-edit/${id}`, dealData);
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
  getDefendantProcess = async (id) => {
    try {
      const { data } = await this.api.get(`/defendant/${id}/process`);
      return data;
    } catch (error) {
      throw error.response.data.msg;
    }
  };
  getProcess = async (id) => {
    try {
      const { data } = await this.api.get(`/process/${id}`);
      return data;
    } catch (error) {
      throw error.response.data.msg;
    }
  };
  getDefendantToAddProcess = async (id) => {
    try {
      const { data } = await this.api.get(`/defendant/${id}/add-process`);
      return data;
    } catch (error) {
      throw error.response.data.msg;
    }
  };
  addDefendantProcess = async (processData, id) => {
    try {
      const { data } = await this.api.post(
        `/defendant/${id}/add-process`,
        processData
      );
      return data;
    } catch (error) {
      throw error.response.data.msg;
    }
  };
  addDealToProcess = async (dealData, id) => {
    try {
      const { data } = await this.api.post(`/deal`, dealData);
      return data;
    } catch (error) {
      throw error.response.data.msg;
    }
  };
  getProcessById = async (id) => {
    try {
      const { data } = await this.api.get(`/process/${id}`);
      return data;
    } catch (error) {
      throw error.response.data.msg;
    }
  };
  getLawSuit = async () => {
    try {
      const { data } = await this.api.get("/process");
      return data;
    } catch (error) {
      throw error.response.data.msg;
    }
  };
  deleteProcess = async (id) => {
    try {
      const { data } = await this.api.delete(`/process/${id}`);
      console.log(data);
      return data;
    } catch (error) {
      throw error.response.data.msg;
    }
  };
  getDeals = async () => {
    try {
      const { data } = await this.api.get("/deals");
      return data;
    } catch (error) {
      throw error.response.data.msg;
    }
  };
  getDealsById = async () => {
    try {
      const { data } = await this.api.get("/deals");
      return data;
    } catch (error) {
      throw error.response.data.msg;
    }
  };
  getOneDeal = async (id) => {
    try {
      const { data } = await this.api.get(`/deal/${id}`);
      return data;
    } catch (error) {
      throw error.response.data.msg;
    }
  };
  getParcels = async (id) => {
    try {
      const { data } = await this.api.get(`/parcels/bydeal/${id}`);
      return data;
    } catch (error) {
      throw error.response.data.msg;
    }
  };
  getAllParcels = async () => {
    try {
      const { data } = await this.api.get(`/parcels/`);
      return data;
    } catch (error) {
      throw error.response.data.msg;
    }
  };
  payParcel = async (parcelId) => {
    try {
      const { data } = await this.api.put(`/payment/pay/${parcelId}`);
      return data;
    } catch (error) {
      throw error.response.data.msg;
    }
  };
  getProcessToDeal = async (id) => {
    try {
      const { data } = await this.api.get(`/deal/${id}`);
      return data;
    } catch (error) {
      throw error.response.data.msg;
    }
  };
  getDealProcess = async (id) => {
    try {
      const { data } = await this.api.get(`/deal/process/${id}`);
      return data;
    } catch (error) {
      throw error.response.data.msg;
    }
  };
  getDefendantDeals = async (defendantId) => {
    try {
      const { data } = await this.api.get(`/deal/defendant/${defendantId}`);
      return data;
    } catch (error) {
      throw error.response.data.msg;
    }
  };
  deleteDeal = async (id) => {
    try {
      const { data } = await this.api.delete(`/deal/${id}`);
      return data;
    } catch (error) {
      throw error.response.data.msg;
    }
  };
}

export default new Api();
