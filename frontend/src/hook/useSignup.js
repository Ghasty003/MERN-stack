import { useContext, useState } from "react";
import AuthContext from "../context/AuthContext";

const useSignup = () => {
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState("");

  const { dispatch } = useContext(AuthContext);

  const signup = async (email, password) => {
    setIsLoading(true);
    setError("");

    const response = await fetch("http://localhost:4000/api/user/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    const json = await response.json();

    if (!response.ok) {
      setError(json.error);
      setIsLoading(false);
    }

    if (response.ok) {
      setIsLoading(false);
      localStorage.setItem("user", JSON.stringify(json));
      dispatch({ type: "LOGIN", payload: json });
    }
  };

  return { signup, error, isLoading };
};

export default useSignup;
