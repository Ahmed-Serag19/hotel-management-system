import { jwtDecode } from "jwt-decode";
import { createContext, useEffect, useState } from "react";

interface AuthData {
  saveLoginData: () => void;
  loginData: any;
  logout: () => void;
}
export let AuthContext = createContext<AuthData | null>(null);

export default function AuthContextProvider(props: any) {
  const [loginData, setLoginData] = useState(null);
  const saveLoginData = () => {
    const encodedToken: any = localStorage.getItem("token");
    const decodedToken: any = jwtDecode(encodedToken);
    setLoginData(decodedToken);
  };
  useEffect(() => {
    if (localStorage.getItem("token")) {
      saveLoginData();
    }
  }, []);

  const logout = () => {
    localStorage.removeItem("token");
    setLoginData(null);
  };

  return (
    <AuthContext.Provider value={{ loginData, saveLoginData, logout }}>
      {props.children}
    </AuthContext.Provider>
  );
}
