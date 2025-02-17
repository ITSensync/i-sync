import axios, { AxiosInstance } from "axios";

export class BoxService {
  protected readonly instance: AxiosInstance;
  public constructor(url: string) {
    this.instance = axios.create({
      baseURL: url,
      timeout: 30000,
      timeoutErrorMessage: "URL Time Out!",
    });
  }

  getListBox = () => {
    return this.instance
      .get(`/`)
      .then((res) => {
        return res.data;
      })
      .catch(function (error) {
        if(error.response) {
          const errorResponse = {
            code: error.response.status,
            message: error.response.statusText,
          }
          return errorResponse
        } else {
          const errorResponse = {
            code: error.code,
            message: error.message,
            name: error.name
          }
          return errorResponse;
        }
      });
  };

  getDetailsBox = (id: string) => {
    return this.instance
      .get(`/${id}/populate`)
      .then((res) => {
        return res.data;
      })
      .catch(function (error) {
        console.log(error)
        if(error.response) {
          const errorResponse = {
            code: error.response.status,
            message: error.response.statusText
          }
          return errorResponse
        } else {
          const errorResponse = {
            code: error.code,
            message: error.message,
            name: error.name
          }
          return errorResponse;
        }
      });
    }

  createBox = (body: unknown) => {
    return this.instance
      .post(`/`, body)
      .then((res) => {
        return res.data;
      })
      .catch(function (error) {
        if(error.response) {
          const errorResponse = {
            code: error.response.status,
            message: error.response.statusText,
          }
          return errorResponse
        } else {
          const errorResponse = {
            code: error.code,
            message: error.message,
            name: error.name
          }
          return errorResponse;
        }
      });
  };

  editBox = (body: unknown, id: string) => {
    return this.instance
      .patch(`/${id}`, body)
      .then((res) => {
        return res.data;
      })
      .catch(function (error) {
        console.log(error)
        if(error.response) {
          const errorResponse = {
            code: error.response.status,
            message: error.response.statusText,
          }
          return errorResponse
        } else {
          const errorResponse = {
            code: error.code,
            message: error.message,
            name: error.name
          }
          return errorResponse;
        }
      });
  };

  deleteBox = (id: string) => {
    return this.instance
      .delete(`/${id}`,)
      .then((res) => {
        return res.data;
      })
      .catch(function (error) {
        console.log(error)
        if(error.response) {
          const errorResponse = {
            code: error.response.status,
            message: error.response.statusText,
          }
          return errorResponse
        } else {
          const errorResponse = {
            code: error.code,
            message: error.message,
            name: error.name
          }
          return errorResponse;
        }
      });
  }
}
