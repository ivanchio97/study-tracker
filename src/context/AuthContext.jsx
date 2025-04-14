import { createContext, useContext, useEffect, useState } from "react";
import { auth } from "../firebase"; 
import { onAuthStateChanged, signOut } from "firebase/auth";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      
      if (currentUser?.uid) {
        setUser(currentUser);
      } else {
        setUser(null);
      }
      setLoading(false);
    });
    return unsubscribe; 
  }, []);

  const login = async (email, password) =>{
    try{
      await signInWithEmailAndPassword(auth, email, password)
    } catch (error) {
      console.log("error: ",error.message)
    }
  }

  const logout = async () =>{
    await signOut(auth)
    setUser(null)
  }

  return (
    <AuthContext.Provider value={{ user, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
