import React, { createContext, useContext, useEffect } from "react";
import firebase from "lib/firebase";
import { useRouter } from "next/router";
import { useAuthState } from "react-firebase-hooks/auth";
import { ErrorMessage, FullPageSpinner } from "components/Common";
import { useRef } from "react";

const AuthContext = createContext<null | firebase.User>(null);
AuthContext.displayName = "AuthProvider";

// we store our user object here
const AuthProvider = ({ children }) => {
  const [user, loading, error] = useAuthState(firebase.auth());
  const router = useRouter();
  const from = useRef(router.route);

  useEffect(() => {
    if (!user) {
      router.push("/login");
    } else {
      // redirect to the last route
      router.push(from.current);
    }
  }, [user]);

  if (loading) {
    return <FullPageSpinner />;
  }
  if (error) {
    return <ErrorMessage message={error.message} />;
  }

  // ise theres a user and we are in the login page, just show the spinner to avoid flashing of login screen
  if (user && router.pathname === "/login") {
    return <FullPageSpinner />;
  }

  return <AuthContext.Provider value={user}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth should be within an AuthProvider");
  }
  return context;
};

export default AuthProvider;
