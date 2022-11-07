import { useState, createContext, useContext } from "react";

const UserContext = createContext();
export const useUserContext = () => useContext(UserContext);

function UserProvider({ children }) {
  const [user, setUser] = useState(null);
  const value = { user, setUser };
  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
}

export default UserProvider;
