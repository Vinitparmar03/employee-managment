import React, { useState } from "react";
import "./CSS/LoginSignup.css";
import {
  useLoginUserMutation,
  useRegisterUserMutation,
} from "../Redux/api/user";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { useDispatch } from "react-redux";
import { userExist } from "../Redux/Reducer/userReducer";

const LoginSignup = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    secret: "",
  });
  const [isLogin, setIsLogin] = useState(true);
  const dispatch = useDispatch();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const [registerUser, { isLoading: isLoadingRegister }] =
    useRegisterUserMutation();
  const [loginUser, { isLoading: isLoadingLogin }] = useLoginUserMutation();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isLogin) {
      const loginCredentials = formData;
      const { data } = await loginUser(loginCredentials);
      if (data) {
        toast.success(data.message);
      }
      dispatch(userExist(data?.user));
      navigate("/");
    } else {
      const registerCredentials = formData;
      const { data } = await registerUser(registerCredentials);

      if (data) {
        toast.success(data.message);
      }
      dispatch(userExist(data.user));
      navigate("/");
    }
  };

  const toggleForm = () => {
    setIsLogin((prevIsLogin) => !prevIsLogin);
  };

  return (
    <div className="login-form-container">
      <div className="form-container">
        <h2>{isLogin ? "Login" : "Signup"}</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="username"
            placeholder="Username"
            value={formData.username}
            onChange={handleChange}
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
          />
          {!isLogin ? (
            <input
              type="text"
              name="secret"
              placeholder="secret code"
              value={formData.secret}
              onChange={handleChange}
              required
            />
          ) : (
            <></>
          )}
          <button type="submit" disabled={isLoadingLogin || isLoadingRegister}>
            {isLogin ? "Login" : "Signup"}
          </button>
        </form>
        <button onClick={toggleForm}>
          {isLogin
            ? "Don't have an account? Signup"
            : "Already have an account? Login"}
        </button>
      </div>
    </div>
  );
};

export default LoginSignup;
