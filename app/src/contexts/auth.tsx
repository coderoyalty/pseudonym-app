import axios from "@/api/axios";
import ScreenLoader from "@/components/ScreenLoader";
import { AxiosError } from "axios";
import React from "react";
import AuthObserver from "./auth.observer";

export interface AuthContextType<T = any> {
  user: T;
  isLoggedIn: boolean;
  signin: (user: T) => void;
  signout: () => void;
  observer: AuthObserver;
}

const AuthContext = React.createContext<AuthContextType>(null!);

interface IUser {
  id: string;
  username: string;
  email: string;
  createdAt: string;
  updatedAt: string;
}

export enum ObserverType {
  UNAUTHORIZED = "unauthorized",
  SERVER_ERROR = "server_error",
}

export const AuthProvider = ({ children }: { children: React.JSX.Element }) => {
  const [user, setUser] = React.useState<IUser | null>(null);
  const [loading, setLoading] = React.useState(false);
  const [isLoggedIn, setLoggedIn] = React.useState(false);

  const observer = new AuthObserver<ObserverType>();

  const signin = (user: IUser) => {
    setUser(user);
    setLoggedIn(true);
  };

  const signout = () => {
    setLoggedIn(false);
    setUser(null);
  };

  const value = {
    user,
    isLoggedIn,
    signin,
    signout,
    observer,
  };

  axios.interceptors.response.use(
    (response) => {
      return response;
    },
    function (error) {
      if (error instanceof AxiosError) {
        if (error.response?.status === 401) {
          observer.trigger(ObserverType.UNAUTHORIZED);
        }
      }

      return Promise.reject(error);
    }
  );

  React.useEffect(() => {
    async function fetchUser() {
      setLoading(true);
      try {
        const response = await axios.get("/users/me/stats");
        setUser(response.data.user);
      } catch (err) {}
      setLoading(false);
    }

    fetchUser();
  }, []);

  return (
    <AuthContext.Provider value={value}>
      <ScreenLoader isLoading={loading} info="checking session state..." />
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const auth = React.useContext(AuthContext);

  return auth;
};
