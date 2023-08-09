import {
    createUserWithEmailAndPassword,
    onAuthStateChanged,
    signInWithEmailAndPassword,
    signOut,
    User,
  } from "firebase/auth";
  import { auth } from "../firebase";
  
  import { useRouter } from "next/router";
  import { createContext, useContext, useEffect, useMemo, useState } from "react";
  
  
  const AuthContext = createContext({
    user: null,
    signIn: async () => {},
    signUp: async () => {},
    logOut: async () => {},
    error: null,
    loading: false,
  });
  
  export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(false);
    const[initialLoading, setInitialLoading] = useState(true)
    const [error, setError] = useState(null)
    const router = useRouter();
  
  
    useEffect(() => {
      onAuthStateChanged(auth, (user) => {
        if (user) {
          setUser(user)
          setLoading(false)
        } else {
          setUser(null)
          setLoading(true)
          router.push('/login')
        }
        setInitialLoading(false)
      })
    },[auth])
  
    const signUp = async (email, password) => {
      setLoading(true);
  
      await createUserWithEmailAndPassword(auth, email, password)
        .then((userCreds) => {
          setUser(userCreds.user);
          router.push("/");
          setLoading(false);
        })
        .catch((error) => alert(error.message))
        .finally(() => setLoading(false));
    };
  
    const signIn = async (email, password) => {
      setLoading(true);
  
      await signInWithEmailAndPassword(auth, email, password)
        .then((userCreds) => {
          setUser(userCreds.user);
          router.push("/");
          setLoading(false);
        })
        .catch((error) => alert(error.message))
        .finally(() => setLoading(false));
    };
  
    const logOut = async () => {
      setLoading(true);
  
      signOut(auth)
        .then(() => {
          setUser(null);
        })
        .catch((error) => alert(error.message))
        .finally(() => setLoading(false));
    };
  
    const memo = useMemo(() => (
      {user, loading, error, signIn, signUp, logOut}
    ), [user, loading, error])
  
    return <AuthContext.Provider value={memo}>{children}</AuthContext.Provider>;
  };
  
  export default function useAuth() {
    return useContext(AuthContext)
  }