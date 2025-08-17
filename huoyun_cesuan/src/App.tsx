import { Routes, Route } from "react-router-dom";
import Home from "@/pages/Home";
import History from "@/pages/History";
import Settings from "@/pages/Settings";
import { createContext, useState } from "react";
import { Empty } from "@/components/Empty";


export const AuthContext = createContext({
  isAuthenticated: false,
  setIsAuthenticated: (value: boolean) => {},
  logout: () => {},
});

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const logout = () => {
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, setIsAuthenticated, logout }}
    >
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/history" element={<History />} />
        <Route path="/settings" element={<Settings />} />
      </Routes>
    </AuthContext.Provider>
  );
}
