import { useState } from "react";
import { SocialIcon } from "./SocalIcon";
import { motion, AnimatePresence } from "framer-motion";
import { LOGIN, REGISTER } from "./api";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const LoginSignupPage = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [user, setUser] = useState({ username: "", email: "", password: "" });
  const [isLoading, setIsLoading] = useState(false);

  const loginMutation = useMutation({
    mutationFn: async (user) => {
      const response = await axios.post(LOGIN, user);
      return response.data;
    },
    onSuccess: (data) => {
      console.log("Login successfully with the foll credentials", data);
      localStorage.setItem("token", data.token);
      toast.success("Login successful!", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      window.location.href = "/";
    },
    onError: (err) => {
      console.error("login error", err.response.data.message || err.message);
      toast.error(
        `Login failed: ${err.response?.data?.message || err.message}`,
        {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        }
      );
    },
  });
  const signupMutation = useMutation({
    mutationFn: async (user) => {
      const response = await axios.post(REGISTER, user);
      return response.data;
    },
    onSuccess: (data) => {
      console.log("Signup Success:", data);
      localStorage.setItem("token", data.token);
    },
    onError: (err) => {
      console.error(
        "Signup Error:",
        err.response?.data?.message || err.message
      );
    },
  });

  const handleModeToggle = () => {
    setIsLogin(!isLogin);
  };

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isLogin) {
      loginMutation.mutate(user);
    } else {
      signupMutation.mutate(user);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center p-4">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -inset-[10%] opacity-50">
          <motion.div
            className="absolute top-1/4 left-1/3 w-96 h-96 bg-purple-600 rounded-full mix-blend-multiply filter blur-3xl"
            animate={{
              x: [0, 30, -20, 0],
              y: [0, -50, 20, 0],
              scale: [1, 1.1, 0.9, 1],
            }}
            transition={{
              duration: 7,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
          <motion.div
            className="absolute top-1/3 right-1/4 w-96 h-96 bg-blue-600 rounded-full mix-blend-multiply filter blur-3xl"
            animate={{
              x: [0, -30, 20, 0],
              y: [0, 50, -20, 0],
              scale: [1, 0.9, 1.1, 1],
            }}
            transition={{
              duration: 7,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 2,
            }}
          />
          <motion.div
            className="absolute bottom-1/3 left-1/2 w-96 h-96 bg-pink-600 rounded-full mix-blend-multiply filter blur-3xl"
            animate={{
              x: [0, 20, -30, 0],
              y: [0, -20, 50, 0],
              scale: [1, 1.1, 0.9, 1],
            }}
            transition={{
              duration: 7,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 4,
            }}
          />
        </div>
      </div>

      <div className="max-w-md w-full relative">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-8"
        >
          <motion.h1
            className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 inline-block"
            animate={{ backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"] }}
            transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
            style={{ backgroundSize: "200% 200%" }}
          >
            Reel Moments
          </motion.h1>
          <p className="text-gray-400 mt-2">
            Capture the world one reel at a time
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="backdrop-blur-lg bg-gray-800 bg-opacity-50 rounded-2xl shadow-xl overflow-hidden border border-gray-700"
        >
          <div className="flex border-b border-gray-700">
            <motion.button
              onClick={() => setIsLogin(true)}
              className={`w-1/2 py-4 text-sm font-medium ${
                isLogin ? "text-white" : "text-gray-400 hover:text-gray-300"
              }`}
              whileHover={{
                backgroundColor: !isLogin ? "rgba(55, 65, 81, 0.3)" : undefined,
              }}
              animate={{
                backgroundColor: isLogin
                  ? "rgba(55, 65, 81, 0.5)"
                  : "transparent",
              }}
              transition={{ duration: 0.2 }}
            >
              Login
            </motion.button>
            <motion.button
              onClick={() => setIsLogin(false)}
              className={`w-1/2 py-4 text-sm font-medium ${
                !isLogin ? "text-white" : "text-gray-400 hover:text-gray-300"
              }`}
              whileHover={{
                backgroundColor: isLogin ? "rgba(55, 65, 81, 0.3)" : undefined,
              }}
              animate={{
                backgroundColor: !isLogin
                  ? "rgba(55, 65, 81, 0.5)"
                  : "transparent",
              }}
              transition={{ duration: 0.2 }}
            >
              Sign Up
            </motion.button>
          </div>

          <div className="p-6">
            <form onSubmit={handleSubmit}>
              <div className="space-y-4">
                <div className="relative">
                  <motion.input
                    type="email"
                    name="email"
                    // value={user.email}
                    onChange={handleChange}
                    className="peer w-full p-4 pt-6 bg-gray-800 bg-opacity-50 border border-gray-700 rounded-lg placeholder-transparent focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent text-white"
                    placeholder="Email"
                    required
                    whileFocus={{ borderColor: "#a855f7" }}
                    transition={{ duration: 0.2 }}
                  />
                  <label
                    htmlFor="email"
                    className="absolute left-4 top-2 text-xs text-gray-400 transition-all peer-placeholder-shown:text-base peer-placeholder-shown:top-4 peer-focus:top-2 peer-focus:text-xs"
                  >
                    Email
                  </label>
                </div>

                <AnimatePresence mode="wait">
                  {!isLogin && (
                    <motion.div
                      className="relative"
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <motion.input
                        type="text"
                        name="username"
                        // value={user.username}
                        onChange={handleChange}
                        className="peer w-full p-4 pt-6 bg-gray-800 bg-opacity-50 border border-gray-700 rounded-lg placeholder-transparent focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent text-white"
                        placeholder="Username"
                        required={!isLogin}
                        whileFocus={{ borderColor: "#a855f7" }}
                        transition={{ duration: 0.2 }}
                      />
                      <label
                        htmlFor="username"
                        className="absolute left-4 top-2 text-xs text-gray-400 transition-all peer-placeholder-shown:text-base peer-placeholder-shown:top-4 peer-focus:top-2 peer-focus:text-xs"
                      >
                        Username
                      </label>
                    </motion.div>
                  )}
                </AnimatePresence>

                <div className="relative">
                  <motion.input
                    type="password"
                    name="password"
                    // value={user.password}
                    onChange={handleChange}
                    className="peer w-full p-4 pt-6 bg-gray-800 bg-opacity-50 border border-gray-700 rounded-lg placeholder-transparent focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent text-white"
                    placeholder="Password"
                    required
                    whileFocus={{ borderColor: "#a855f7" }}
                    transition={{ duration: 0.2 }}
                  />
                  <label
                    htmlFor="password"
                    className="absolute left-4 top-2 text-xs text-gray-400 transition-all peer-placeholder-shown:text-base peer-placeholder-shown:top-4 peer-focus:top-2 peer-focus:text-xs"
                  >
                    Password
                  </label>
                </div>

                <motion.button
                  type="submit"
                  className={`w-full py-4 rounded-lg font-medium ${
                    isLoading
                      ? "bg-gray-700 text-gray-300 cursor-not-allowed"
                      : "bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:shadow-lg"
                  }`}
                  disabled={isLoading}
                  whileHover={
                    !isLoading
                      ? {
                          scale: 1.03,
                          boxShadow:
                            "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
                        }
                      : {}
                  }
                  whileTap={!isLoading ? { scale: 0.98 } : {}}
                >
                  {isLoading ? (
                    <span className="flex items-center justify-center">
                      <motion.svg
                        className="h-5 w-5 text-white mr-3"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        animate={{ rotate: 360 }}
                        transition={{
                          duration: 1,
                          repeat: Infinity,
                          ease: "linear",
                        }}
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                      </motion.svg>
                      Processing...
                    </span>
                  ) : isLogin ? (
                    "Login"
                  ) : (
                    "Create Account"
                  )}
                </motion.button>
              </div>
            </form>

            <div className="mt-6 text-center">
              <p className="text-gray-400 text-sm">
                {isLogin ? (
                  <>
                    Don't have an account?{" "}
                    <motion.button
                      onClick={handleModeToggle}
                      className="text-purple-400 hover:text-purple-300"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      Sign Up
                    </motion.button>
                  </>
                ) : (
                  <>
                    Already have an account?{" "}
                    <motion.button
                      onClick={handleModeToggle}
                      className="text-purple-400 hover:text-purple-300"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      Login
                    </motion.button>
                  </>
                )}
              </p>
            </div>

            <AnimatePresence>
              {isLogin && (
                <motion.div
                  className="mt-4 text-center"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                >
                  <motion.button
                    className="text-sm text-gray-400 hover:text-gray-300"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Forgot password?
                  </motion.button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>

        {/* Social Login Options */}
        <motion.div
          className="mt-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <div className="flex items-center justify-center">
            <div className="flex-grow h-px bg-gray-700"></div>
            <span className="px-4 text-sm text-gray-400">Or continue with</span>
            <div className="flex-grow h-px bg-gray-700"></div>
          </div>

          <div className="flex justify-center mt-4 space-x-4">
            {["github", "twitter", "google", "apple"].map((platform, index) => (
              <motion.button
                key={platform}
                className="p-3 rounded-full bg-gray-800 text-white hover:bg-gray-700"
                whileHover={{ scale: 1.1, backgroundColor: "rgb(55, 65, 81)" }}
                whileTap={{ scale: 0.95 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.3 + index * 0.1 }}
              >
                <SocialIcon platform={platform} />
              </motion.button>
            ))}
          </div>
        </motion.div>

        {/* Footer */}
        <motion.div
          className="mt-8 text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          <p className="text-xs text-gray-500">
            By signing up, you agree to our{" "}
            <a href="#" className="text-gray-400 hover:text-gray-300">
              Terms
            </a>{" "}
            &{" "}
            <a href="#" className="text-gray-400 hover:text-gray-300">
              Privacy Policy
            </a>
          </p>
        </motion.div>
      </div>
    </div>
  );
};
export default LoginSignupPage;
