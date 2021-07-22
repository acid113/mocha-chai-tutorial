import axios, { AxiosRequestConfig } from "axios";

export const getCharacters = async (): Promise<any> => {
  const option: AxiosRequestConfig = {
    method: "GET",
    url: "https://swapi.dev/api/people",
  };

  try {
    const response = await axios.request(option);
    const { results } = response.data;

    return results;
  } catch (error) {
    throw new Error(error);
  }
};

export const getCharacter = async (id: number): Promise<any> => {
  const option: AxiosRequestConfig = {
    method: "GET",
    url: `https://swapi.dev/api/people/${id}`,
  };

  try {
    const response = await axios.request(option);
    const results = response.data;

    return results;
  } catch (error) {
    throw new Error(error);
  }
};
