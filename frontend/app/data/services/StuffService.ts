import axios, { AxiosInstance } from "axios";

export class StuffService {
  protected readonly instance: AxiosInstance;
  public constructor(url: string) {
    this.instance = axios.create({
      baseURL: url,
      timeout: 30000,
      timeoutErrorMessage: "URL Time Out!",
    });
  }

  createStuff = (body: unknown) => {
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

  editStuff = (body: unknown, stuffId: string) => {
    return this.instance
      .patch(`/${stuffId}`, body)
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

  deleteStuff = (stuffId: string) => {
    return this.instance
      .delete(`/${stuffId}`,)
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
