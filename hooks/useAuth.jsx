import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
} from "firebase/auth";
import { auth, db } from "../firebase";

import { useRouter } from "next/router";
import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { storage } from "@/firebase";
import { doc, setDoc } from "firebase/firestore";

const AuthContext = createContext({
  user: null,
  updatedUser: null,
  addImageAndName: async () => {},
  signIn: async () => {},
  signUp: async () => {},
  logOut: async () => {},
  error: null,
  loading: false,
});

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(true);
  const [updatedUser, setUpdatedUser] = useState(null);
  const [error, setError] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const sub = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
        setLoading(false);
      } else {
        setUser(null);
        setLoading(true);
        router.push("/login");
      }
      setInitialLoading(false);

      return () => {
        sub()
      }
    });
  }, [auth]);

  const addImageAndName = async (email, image, displayName) => {
    const currentUser = auth.currentUser;

    if (currentUser) {
      try {
        const storageRef = ref(storage, displayName);
        const uploadTask = uploadBytesResumable(storageRef, image[0]);

        await new Promise((resolve, reject) => {
          uploadTask.on(
            "state_changed",
            (snapshot) => {},
            (error) => {
              console.log(error.message);
              reject(error);
            },
            async () => {
              try {
                const downloadURL = await getDownloadURL(
                  uploadTask.snapshot.ref
                );

                await Promise.all([
                  updateProfile(currentUser, {
                    displayName,
                    photoURL: downloadURL,
                  }),
                  setDoc(doc(db, "users", currentUser.uid), {
                    uid: currentUser.uid,
                    displayName,
                    email,
                    photoURL: downloadURL,
                  }),
                  setDoc(doc(db, "userChats", currentUser.uid), {}),
                ]);
                resolve();
                setUpdatedUser(currentUser);
              } catch (error) {
                console.error("Error updating user profile:", error.message);
                reject(error);
              }
            }
          );
        });
      } catch (error) {
        console.error("Error during image upload:", error.message);
      }
    }
  };

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

  const memo = useMemo(
    () => ({
      user,
      loading,
      error,
      updatedUser,
      addImageAndName,
      signIn,
      signUp,
      logOut,
    }),
    [user, loading, error, db, updatedUser]
  );

  return <AuthContext.Provider value={memo}>{children}</AuthContext.Provider>;
};

export default function useAuth() {
  return useContext(AuthContext);
}
