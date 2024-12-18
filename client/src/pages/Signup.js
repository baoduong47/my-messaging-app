import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { registerUser } from "../redux/actions/authActions";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import GoogleIcon from "@mui/icons-material/Google";
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";
import { motion } from "framer-motion";

const Signup = () => {
  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({
    firstname: "",
    lastname: "",
    email: "",
    password: "",
  });

  const dispatch = useDispatch();
  const authError = useSelector((state) => state.auth.error);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    let error = "";

    switch (name) {
      case "firstname":
      case "lastname":
        if (!value.trim()) {
          error = `${
            name.charAt(0).toUpperCase() + name.slice(1)
          } is required.`;
        }
        break;
      case "email":
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailPattern.test(value)) {
          error = "Invalid email address.";
        }
        break;
      case "password":
        if (value.length < 2) {
          error = "Password must be at least 2 characters long.";
        }
        break;
      default:
        break;
    }

    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: error,
    }));
  };

  const validateForm = () => {
    let formIsValid = true;
    let errors = {};

    if (!formData.firstname.trim()) {
      formIsValid = false;
      errors.firstname = "First name is required.";
    }

    if (!formData.lastname.trim()) {
      formIsValid = false;
      errors.lastname = "Last name is required.";
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(formData.email)) {
      formIsValid = false;
      errors.email = "Invalid email address.";
    }

    if (formData.password.length < 2) {
      formIsValid = false;
      errors.password = "Password must be at least 2 characters long.";
    }

    setErrors(errors);
    return formIsValid;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      dispatch(registerUser(formData));
      console.log("Form submitted", formData);
    } else {
      console.log("Form has errors", errors);
    }
  };

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get("token");

    if (token) {
      localStorage.setItem("token", token);
      window.location.href = "/home";
    }
  }, []);

  return (
    <motion.div
      className="flex h-screen bg-customBlue"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 2, ease: "easeInOut" }}
    >
      <div
        className="w-3/6 flex items-center justify-center bg-cover bg-center"
        style={{ backgroundImage: "url('/images/cute-ff.jpg')" }}
      ></div>
      <div className="w-3/6 bg-signupBackground flex items-center justify-center p-8">
        <motion.div
          className="w-full max-w-md"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 2, ease: "easeInOut" }}
        >
          <h2 className="text-5xl font-bold mb-16">Create Account</h2>
          <form className="space-y-6" onSubmit={handleSubmit}>
            {authError && (
              <motion.div
                initial={{ y: -30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.75, ease: "easeOut" }}
              >
                <Alert severity="error">
                  <AlertTitle>Error</AlertTitle>
                  {typeof authError === "string"
                    ? authError
                    : authError.message}
                </Alert>
              </motion.div>
            )}
            <div className="flex space-x-4">
              <TextField
                error={!!errors.firstname}
                helperText={errors.firstname}
                type="text"
                id="firstname"
                name="firstname"
                value={formData.firstname}
                onChange={handleChange}
                onBlur={handleBlur}
                size="small"
                label="First Name"
                variant="outlined"
                className="w-1/2"
                sx={{
                  "& .MuiOutlinedInput-root": {
                    "&.Mui-focused fieldset": {
                      borderColor: "#536f50",
                    },
                    "&:hover fieldset": {
                      borderColor: "#536f50",
                    },
                    "& .MuiOutlinedInput-notchedOutline": {
                      borderColor: "#536f50",
                    },
                  },
                  "& .MuiInputLabel-root.Mui-focused": {
                    color: "#536f50",
                  },
                }}
              />
              <TextField
                error={!!errors.lastname}
                helperText={errors.lastname}
                type="text"
                id="lastname"
                name="lastname"
                value={formData.lastname}
                onChange={handleChange}
                onBlur={handleBlur}
                size="small"
                label="Last Name"
                variant="outlined"
                className="w-1/2"
                sx={{
                  "& .MuiOutlinedInput-root": {
                    "&.Mui-focused fieldset": {
                      borderColor: "#536f50",
                    },
                    "&:hover fieldset": {
                      borderColor: "#536f50",
                    },
                    "& .MuiOutlinedInput-notchedOutline": {
                      borderColor: "#536f50",
                    },
                  },
                  "& .MuiInputLabel-root.Mui-focused": {
                    color: "#536f50",
                  },
                }}
              />
            </div>
            <TextField
              error={!!errors.email}
              helperText={errors.email}
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              onBlur={handleBlur}
              size="small"
              label="Email"
              variant="outlined"
              fullWidth
              sx={{
                "& .MuiOutlinedInput-root": {
                  "&.Mui-focused fieldset": {
                    borderColor: "#536f50",
                  },
                  "&:hover fieldset": {
                    borderColor: "#536f50",
                  },
                  "& .MuiOutlinedInput-notchedOutline": {
                    borderColor: "#536f50",
                  },
                },
                "& .MuiInputLabel-root.Mui-focused": {
                  color: "#536f50",
                },
              }}
            />
            <TextField
              error={!!errors.password}
              helperText={errors.password}
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              onBlur={handleBlur}
              size="small"
              label="Password"
              variant="outlined"
              fullWidth
              sx={{
                "& .MuiOutlinedInput-root": {
                  "&.Mui-focused fieldset": {
                    borderColor: "#536f50",
                  },
                  "&:hover fieldset": {
                    borderColor: "#536f50",
                  },
                  "& .MuiOutlinedInput-notchedOutline": {
                    borderColor: "#536f50",
                  },
                },
                "& .MuiInputLabel-root.Mui-focused": {
                  color: "#536f50",
                },
              }}
            />
            <Button
              variant="contained"
              type="submit"
              className="w-full px-4 py-2.5 border text-white rounded-lg flex justify-center items-center"
              sx={{
                backgroundColor: "#536f50",
                "&:hover": {
                  backgroundColor: "#435d40",
                },
              }}
            >
              Create Account
            </Button>
            <h4 className="text-s text-[#666565]">
              Already have an account?{" "}
              <a href="/login" className="text-highlightColor">
                Login.
              </a>
            </h4>
            <div className="flex items-center py-6">
              <div className="flex-grow border-t border-gray-400"></div>
              <span className="px-4 text-gray-600">or</span>
              <div className="flex-grow border-t border-gray-400"></div>
            </div>
            <div className="text-center space-x-4">
              <Button
                size="small"
                variant="outlined"
                type="button"
                startIcon={<GoogleIcon sx={{ color: "#008744" }} />}
                sx={{
                  borderColor: "gray",
                  color: "#666565",
                  padding: "10px 16px",
                  fontSize: "11px",
                  width: "450px",
                  "&:hover": {
                    borderColor: "gray",
                    color: "#666565",
                  },
                }}
                onClick={() => {
                  const url = `${process.env.REACT_APP_BACKEND_URL}/auth/google`;
                  console.log("Redirecting to:", url);
                  window.location.href = url;
                }}
              >
                Sign up with Google
              </Button>
            </div>
          </form>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Signup;
