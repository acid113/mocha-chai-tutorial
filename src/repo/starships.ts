import axios, { AxiosRequestConfig } from "axios";

export const getStarShips = async (): Promise<any> => {
  const option: AxiosRequestConfig = {
    method: "GET",
    url: "https://swapi.dev/api/starships",
  };

  try {
    const response = await axios.request(option);
    const { results } = response.data;

    return results;
  } catch (error) {
    throw new Error(error);
  }
};

export const getStarShip = async (id: number): Promise<any> => {
  const option: AxiosRequestConfig = {
    method: "GET",
    url: `https://swapi.dev/api/starships/${id}`,
  };

  try {
    const response = await axios.request(option);
    const results = response.data;

    return results;
  } catch (error) {
    throw new Error(error);
  }
};
