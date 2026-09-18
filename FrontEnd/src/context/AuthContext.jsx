import { createContext, useContext, useState } from "react";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  // null = personne n'est connectée en tant que pro
  const [proUser, setProUser] = useState(null);
  // null = personne n'est connectée en tant que client
  const [clientUser, setClientUser] = useState(null);

  const login = (metier, nom) => setProUser({ metier, nom });
  const logout = () => setProUser(null);

  const loginClient = (nom) => setClientUser({ nom });
  const logoutClient = () => setClientUser(null);

  return (
    <AuthContext.Provider
      value={{
        proMetier: proUser?.metier || null,
        proNom: proUser?.nom || null,
        login,
        logout,
        clientNom: clientUser?.nom || null,
        isClientConnected: !!clientUser,
        loginClient,
        logoutClient,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}