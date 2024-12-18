import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginUser, authenticateWithToken } from "../redux/actions/authActions";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import LoadingScreen from "./LoadingScreen";
import { motion } from "framer-motion";
import IconButton from "@mui/material/IconButton";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";

const Login = () => {
  const [formData, setFormData] = useState({
    email: localStorage.getItem("email") || "",
    password: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe] = useState(
    () => localStorage.getItem("rememberMe") === true
  );

  const dispatch = useDispatch();
  const authError = useSelector((state) => state.auth.error);
  const authenticated = useSelector((state) => state.auth.isAuthenticated);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const togglePasswordVisibility = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    localStorage.setItem("rememberMe", rememberMe ? "true" : "false");
    if (rememberMe) {
      localStorage.setItem("email", formData.email);
    } else {
      localStorage.removeItem("email");
    }

    dispatch(loginUser(formData, rememberMe));
  };

  useEffect(() => {
    if (authenticated) {
      setIsLoading(true);
      setTimeout(() => {
        window.location.href = "/home";
      }, 3000);
    } else if (authError) {
      setIsLoading(false);
    }
  }, [authenticated, authError]);

  useEffect(() => {
    const queryParams = new URLSearchParams(window.location.search);
    const token = queryParams.get("token");
    const action = queryParams.get("action");

    if (token) {
      window.history.replaceState({}, document.title, window.location.pathname);

      localStorage.setItem("authToken", token);
      dispatch(authenticateWithToken(token));

      setIsLoading(true);
    }
  }, [dispatch]);

  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <motion.div
      className="flex flex-col justify-center items-center h-screen text-white bg-white"
      style={{
        backgroundImage: "url('/images/loading.png')",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "fixed",
      }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 2 }}
    >
      {authError && (
        <motion.p
          className="text-red-500"
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1 }}
        >
          {authError.message || "Invalid login credentials"}
        </motion.p>
      )}
      <motion.div
        className="mb-6"
        initial={{ scale: 0.7, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1.5 }}
      >
        <h2 className="text-3xl font-bold text-center mb-2">Welcome back!</h2>
        <h3 className="text-l">
          Don't have an account yet?{" "}
          <a href="/signup" className="text-buttonColor">
            Sign up now
          </a>
        </h3>
      </motion.div>
      <motion.div
        className="w-full max-w-sm"
        initial={{ y: 70, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1.5 }}
      >
        <form className="space-y-4" onSubmit={handleSubmit}>
          {authError?.field === "email" && (
            <p className="text-red-500">{authError.message}</p>
          )}
          <TextField
            size="small"
            type="email"
            id="email"
            name="email"
            onChange={handleChange}
            value={formData.email}
            variant="filled"
            label="Email"
            fullWidth
            sx={{
              "& .MuiFilledInput-root": {
                backgroundColor: "rgba(51, 51, 51, 0.6)",
                "&:hover": {
                  backgroundColor: "rgba(68, 68, 68, 0.6)",
                },
                "&.Mui-focused": {
                  backgroundColor: "rgba(85, 85, 85, 0.6)",
                },
                "& .MuiInputBase-input": {
                  color: "white",
                },
                "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                  borderColor: "#895881",
                },
              },
              "& .MuiInputLabel-root": {
                color: "white",
                fontSize: "13px",
              },
              "& .MuiInputLabel-root.Mui-focused": {
                color: "#FCF8F3",
              },
              "& .MuiFilledInput-underline:before": {
                borderBottomColor: "#895881",
              },
              "& .MuiFilledInput-underline:after": {
                borderBottomColor: "#895881",
              },
              "& .MuiFilledInput-underline:hover:before": {
                borderBottomColor: "#7A4972",
              },
            }}
          />

          <TextField
            size="small"
            type={showPassword ? "text" : "password"}
            id="password"
            name="password"
            onChange={handleChange}
            value={formData.password}
            variant="filled"
            label="Password"
            fullWidth
            sx={{
              "& .MuiFilledInput-root": {
                backgroundColor: "rgba(51, 51, 51, 0.6)",
                "&:hover": {
                  backgroundColor: "rgba(68, 68, 68, 0.6)",
                },
                "&.Mui-focused": {
                  backgroundColor: "rgba(85, 85, 85, 0.6)",
                },
                "& .MuiInputBase-input": {
                  color: "white",
                },
                "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                  borderColor: "#895881",
                },
              },
              "& .MuiInputLabel-root": {
                color: "white",
                fontSize: "13px",
              },
              "& .MuiInputLabel-root.Mui-focused": {
                color: "#FCF8F3",
              },
              "& .MuiFilledInput-underline:before": {
                borderBottomColor: "#895881",
              },
              "& .MuiFilledInput-underline:after": {
                borderBottomColor: "#895881",
              },
              "& .MuiFilledInput-underline:hover:before": {
                borderBottomColor: "#7A4972",
              },
            }}
            InputProps={{
              endAdornment: (
                <IconButton
                  style={{ color: "white" }}
                  onClick={togglePasswordVisibility}
                >
                  {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                </IconButton>
              ),
            }}
          />

          <div className="flex justify-center pt-4">
            <Button
              size="small"
              variant="contained"
              type="submit"
              className="w-1/2"
              sx={{
                borderColor: "gray",
                color: "white",
                padding: "10px 16px",
                fontSize: "11px",
                backgroundColor: "#392840",
                "&:hover": {
                  backgroundColor: "#392840",
                },
              }}
            >
              Log In
            </Button>
          </div>
          <div className="flex items-center py-6">
            <div className="flex-grow border-t border-gray-400"></div>
            <span className="px-4 text-white">or</span>
            <div className="flex-grow border-t border-gray-400"></div>
          </div>
          <div className="text-center ">
            <Button
              sx={{ color: "#C0D7D5" }}
              type="button"
              size="small"
              onClick={() => {
                window.location.href = `${process.env.REACT_APP_BACKEND_URL}/auth/google`;
              }}
            >
              Log in with Google
            </Button>
          </div>
        </form>
      </motion.div>
    </motion.div>
  );
};

export default Login;
