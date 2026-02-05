import { Navigate } from "react-router-dom";
import Login from '../authentication/Login'
import { useState,useEffect } from "react";

// firebase 
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../fireBase/firebase.js";


function PrivateRoute({children}) {
  
   const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  
    useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  if (loading) return <p>Loading...</p>;

  return user ? children : <Navigate to="/login" replace />;
}


export default PrivateRoute