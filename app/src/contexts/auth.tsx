import axios from "@/api/axios";
import { AxiosError } from "axios";
import React from "react";

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
  email: string;
}

export enum ObserverType {
  UNAUTHORIZED = "unauthorized",
  SERVER_ERROR = "server_error",
}

class AuthObserver<T = string> {
  private observers: Map<T, VoidFunction[]> = new Map();

  subscribe(eventType: T, callback: VoidFunction) {
    const callbacks = this.observers.get(eventType);
    if (!callbacks) {
      this.observers.set(eventType, [callback]);
      return;
    }
    // avoid duplicate callbacks
    if (callbacks.find((value) => value.name === callback.name)) {
      return;
    }

    callbacks.push(callback);
  }

  async trigger(eventType: T) {
    const callbacks = this.observers.get(eventType);
    if (!callbacks) {
      return;
    }

    const promises = callbacks.map((callback) => callback());

    await Promise.all(promises);
  }
}

export const AuthProvider = ({ children }: { children: React.JSX.Element }) => {
  const [user, setUser] = React.useState<IUser | null>(null);
  const [isLoggedIn, setLoggedIn] = React.useState(false);

  const observer = new AuthObserver<ObserverType>();

  const signin = (user: any) => {
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
      console.log(error);
      if (error instanceof AxiosError) {
        if (error.response?.status === 401) {
          observer.trigger(ObserverType.UNAUTHORIZED);
        }
      } else {
        console.error(error);
      }

      return Promise.reject(error);
    }
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const auth = React.useContext(AuthContext);

  return auth;
};
