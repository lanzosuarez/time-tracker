import React, { createContext, useContext, useEffect } from "react";
import firebase from "lib/firebase";
import Router from "next/router";
import { useAuthState } from "react-firebase-hooks/auth";
import { ErrorMessage, FullPageSpinner } from "components/Common";

const AuthContext = createContext<null | firebase.User>(null);

const AuthProvider = ({ children }) => {
  const [user, loading, error] = useAuthState(firebase.auth());

  useEffect(() => {
    if (!user) {
      Router.push("/login");
    } else {
      Router.push("/");
    }
  }, [user]);

  if (loading) {
    return <FullPageSpinner />;
  }
  if (error) {
    return <ErrorMessage message={error.message} />;
  }

  // avoid flashing of login screen
  if (user && Router.pathname === "/login") {
    return <FullPageSpinner />;
  }

  return <AuthContext.Provider value={user}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("Your component should be wrapped around a AuthProvider");
  }
  return context;
};

export default AuthProvider;
