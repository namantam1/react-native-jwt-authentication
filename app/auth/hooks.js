import { useContext, useState } from "react"
import AuthContext from "./context";
import authStorage from "./storage";

export const useAuthContext = () => {
  const {user, setUser} = useContext(AuthContext);
  const [ready, setReady] = useState(false);

  const restoreUser = async () => {
    setReady(false);
    const user = await authStorage.getData("user");
    setReady(true);
    if (user) {
      console.log(user);
      return setUser(user);
    }

    return await authStorage.removeAllData();
  }

  const loginUser = async ({access, refresh}) => {
    const user = await authStorage.setAllData({access, refresh});
    setUser(user);
  }

  const logoutUser = () => {
    authStorage.removeAllData();
    setUser(null);
  }

  return {ready, user, loginUser, logoutUser, restoreUser}
}
