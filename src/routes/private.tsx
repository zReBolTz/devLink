import { onAuthStateChanged } from "firebase/auth";
import { ReactNode, useEffect, useState } from "react";
import { auth } from "../services/firebase/firebaseConnection";
import { Navigate } from "react-router-dom";

interface privateProps {
  children: ReactNode;
}

const Private = ({ children }: privateProps): any => {
  const [loading, setLoading] = useState(true);
  const [signed, setSigned] = useState(false);
  useEffect(() => {
    const onSub = onAuthStateChanged(auth, (user) => {
      if (user) {
        const userData = {
          uid: user?.uid,
          email: user?.email,
        };
        localStorage.setItem("@devLinks", JSON.stringify(userData));
        setLoading(false);
        setSigned(true);
      } else {
        setLoading(false);
        setSigned(false);
      }
    });
    return () => {
      onSub();
    };
  }, []);
  if (loading) {
    return <div></div>;
  }
  if (!signed) {
    return <Navigate to="/login" />;
  }

  return children;
};

export default Private;
