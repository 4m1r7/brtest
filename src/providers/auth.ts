import { AuthBindings } from "@refinedev/core";

import { api, routes } from "../utils/api";

export const TOKEN_KEY = "TOKEN_KEY";
const TOKEN_EXPIRES_AT = "TOKEN_EXPIRES_AT";

export const authProvider: AuthBindings = {
  login: async ({ email, password }) => {
    try {
      if (email && password) {
        const { data } = await api.post<{
          accessToken: string;
          expiresAt: string;
        }>(routes.login, {
          email,
          password,
        });

        localStorage.setItem(TOKEN_KEY, data.accessToken);
        localStorage.setItem(TOKEN_EXPIRES_AT, data.expiresAt);

        return {
          success: true,
          redirectTo: "/",
        };
      }

      return {
        success: false,
        error: {
          name: "LoginError",
          message: "Invalid email or password",
        },
      };
    } catch (error) {
      return {
        success: false,
        error: {
          name: "LoginError",
          message: "Invalid email or password",
        },
      };
    }
  },

  logout: async () => {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(TOKEN_EXPIRES_AT);

    return {
      success: true,
      redirectTo: "/login",
    };
  },

  check: async () => {
    const token = localStorage.getItem(TOKEN_KEY);

    if (token) {
      return {
        authenticated: true,
      };
    }

    return {
      authenticated: false,
      redirectTo: "/login",
    };
  },

  getPermissions: async () => null,

  getIdentity: async () => {
    // const { data } = await api.get<Get<User>>(routes.user);

    // if (token) {
    return {
      id: 1,
      name: "John Doe",
      avatar: "https://i.pravatar.cc/300",
    };

    // return null;
  },

  onError: async (error) => {
    console.error(error);
    return { error };
  },
};
