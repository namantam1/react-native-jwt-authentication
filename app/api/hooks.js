import { useState } from "react"
import { useAuthContext } from "../auth/hooks";

export const useBaseApi = (func) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const {logoutUser} = useAuthContext();

  const request = async (...data) => {
    setLoading(true);
    const response = await func(...data);
    // if token expire logout user
    // no need to update any state
    if (response.tokenExpired) {
      alert("Your session out. please login again");
      return logoutUser();
    }

    setLoading(false);

    if (response.ok) {
      setData(response.data);
    }

    // console.log(response);
    return response;
  }

  return {loading, data, request};
}
