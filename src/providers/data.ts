import {
  DataProvider,
  type BaseRecord,
  type GetOneParams,
  type UpdateParams,
  type GetListParams,
  type GetOneResponse,
  type UpdateResponse,
  type DeleteOneParams,
  type GetListResponse,
  type DeleteOneResponse,
} from "@refinedev/core";
import axios from "axios";

import { TOKEN_KEY } from "./auth";

const axiosInstance = axios.create();

// add token to every request
axiosInstance.interceptors.request.use(
  async (config) => {
    const token = localStorage.getItem(TOKEN_KEY);

    if (token && config?.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
export const dataProvider = (url: string): DataProvider => ({
  getList: async function <TData extends BaseRecord = BaseRecord>(
    params: GetListParams
  ): Promise<GetListResponse<TData>> {
    const { data } = await axiosInstance.get<GetListResponse<TData>>(
      `${url}/${params.resource}`
    );

    return data;
  },

  getOne: async function <TData extends BaseRecord = BaseRecord>(
    params: GetOneParams
  ): Promise<GetOneResponse<TData>> {
    // getOne: async ({id}) => {
    const { data } = await axiosInstance.get<GetOneResponse<TData>>(
      `${url}/${params.resource}/${params.id}`
    );

    return data;
  },

  create: async ({ resource, variables }) => {
    const { data } = await axiosInstance.post(`${url}/${resource}`, variables);

    return data;
  },

  update: async <
    TData extends BaseRecord = BaseRecord,
    TVariables = Record<string, string>
  >(
    params: UpdateParams<TVariables>
  ): Promise<UpdateResponse<TData>> => {
    const { data } = await axiosInstance.put<GetOneResponse<TData>>(
      `${url}/${params.resource}/${params.id}`,
      params.variables
    );

    return data;
  },

  deleteOne: async <
    TData extends BaseRecord = BaseRecord,
    TVariables = Record<string, string>
  >(
    params: DeleteOneParams<TVariables>
  ): Promise<DeleteOneResponse<TData>> => {
    const { data } = await axiosInstance.delete<GetOneResponse<TData>>(
      `${url}/${params.resource}/${params.id}`
    );

    return data;
  },

  getApiUrl: () => url,
});
