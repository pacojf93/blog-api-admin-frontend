import { useOutletContext } from "react-router";
import { useEffect } from "react";

const LogOut = () => {
  const { setUser, navigate } = useOutletContext();

  useEffect(() => {
    setUser(null);
    navigate(-1);
  }, []);

  return <h2>Loggin out</h2>;
};

export default LogOut;
