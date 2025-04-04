import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { useWelcome } from "../hooks/useWelcome";
import axios from "axios";
import { REELS_UPLOAD } from "../api";
import { QueryClient, useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";
import ReelsSection from "./ReelsSection";

const WelcomePage = () => {
  const [showReels, setShowReels] = useState(false);
  const containerRef = useRef(null);
  const inputRef = useRef(null);
  const [ref, inView] = useInView({
    triggerOnce: false,
    threshold: 0.1,
  });
  const queryClient = new QueryClient();

  useEffect(() => {
    if (!containerRef.current) return;

    const container = containerRef.current;
    const particleCount = 50;
    const particles = [];

    for (let i = 0; i < particleCount; i++) {
      const particle = document.createElement("div");
      particle.className = "absolute rounded-full bg-white opacity-0";

      const size = Math.random() * 3 + 2;
      particle.style.width = `${size}px`;
      particle.style.height = `${size}px`;

      particle.style.left = `${Math.random() * 100}%`;
      particle.style.top = `${Math.random() * 100}%`;

      const data = {
        x: Math.random() * 100 - 50,
        y: Math.random() * -100 - 50,
        opacity: Math.random() * 0.5 + 0.3,
        delay: Math.random() * 10,
        lifetime: Math.random() * 3 + 2,
        size,
      };

      particles.push({ element: particle, data });
      container.appendChild(particle);
    }

    let animationFrameId;
    let lastTime = 0;

    const animate = (time) => {
      if (!lastTime) lastTime = time;
      const deltaTime = (time - lastTime) / 1000;
      lastTime = time;

      particles.forEach((particle) => {
        const { element, data } = particle;

        data.delay -= deltaTime;

        if (data.delay <= 0) {
          data.lifetime -= deltaTime;

          if (data.lifetime <= 0) {
            data.delay = Math.random() * 5;
            data.lifetime = Math.random() * 3 + 2;
            element.style.opacity = "0";
            element.style.left = `${Math.random() * 100}%`;
            element.style.top = `${Math.random() * 100}%`;
          } else {
            const newLeft =
              parseFloat(element.style.left) + data.x * deltaTime * 0.01;
            const newTop =
              parseFloat(element.style.top) + data.y * deltaTime * 0.1;

            element.style.left = `${newLeft}%`;
            element.style.top = `${newTop}%`;
            element.style.opacity =
              data.lifetime > 1 ? data.opacity : data.opacity * data.lifetime;
          }
        }
      });

      animationFrameId = requestAnimationFrame(animate);
    };

    animationFrameId = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animationFrameId);
      particles.forEach((particle) => {
        container.removeChild(particle.element);
      });
    };
  }, []);
  const fileUploadMutation = useMutation({
    mutationFn: async (file) => {
      const formData = new FormData();
      formData.append("file", file);
      const token = localStorage.getItem("token");
      const response = axios.post(REELS_UPLOAD, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries(["reels"]);
      toast.success("Reel Uploaded!", {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    },
    onError: (error) => {
      console.error(error);
      toast.error("Error uploading reel", {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    },
  });
  const handleUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      fileUploadMutation.mutate(file);
      fileUploadMutation.isPending &&
        toast.info("Uploading...", {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });
    }
  };
  const { userData } = useWelcome();
  console.log({ userData });
  const username = userData?.username;
  return (
    <div className="min-h-screen bg-gray-900 flex flex-col items-center justify-center relative overflow-hidden">
      <div className="absolute inset-0">
        <div ref={containerRef} className="absolute inset-0 z-0"></div>

        <div className="absolute -inset-[10%] opacity-40">
          <motion.div
            className="absolute top-1/4 left-1/3 w-96 h-96 bg-purple-600 rounded-full mix-blend-multiply filter blur-3xl"
            animate={{
              x: [0, 30, -20, 0],
              y: [0, -50, 20, 0],
              scale: [1, 1.1, 0.9, 1],
            }}
            transition={{
              duration: 15,
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
              duration: 15,
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
              duration: 15,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 4,
            }}
          />
        </div>

        <div className="absolute inset-0 bg-[radial-gradient(rgba(255,255,255,0.1)_1px,transparent_1px)] bg-[length:40px_40px] opacity-20"></div>
      </div>

      <motion.div
        className="relative z-10 w-full max-w-4xl mx-auto px-6 flex flex-col items-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <motion.div
          className="relative mt-10 overflow-hidden w-full mb-12 backdrop-blur-lg bg-gray-800 bg-opacity-30 p-6 rounded-2xl border border-gray-700 shadow-lg"
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ type: "spring", stiffness: 100, delay: 0.2 }}
        >
          <div className="overflow-hidden">
            <motion.h1
              className="text-3xl flex  md:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-500 to-red-500"
              animate={{ x: [0, -100, 0] }}
              transition={{
                repeat: Infinity,
                duration: 15,
                ease: "linear",
              }}
              style={{
                backgroundSize: "200% auto",
              }}
            >
              {/* Welcome {username} <span className="inline-block ml-4">✨</span> */}
              <span>Welcome {username}</span>{" "}
              <span className="inline-block ml-4">✨</span>
              {/* Welcome {username} <span className="inline-block ml-4">✨</span> */}
            </motion.h1>
          </div>

          <motion.div
            className="mt-2 w-full h-1 rounded-full overflow-hidden bg-gray-700"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 1, delay: 1 }}
          >
            <motion.div
              className="h-full bg-gradient-to-r from-purple-500 via-pink-500 to-red-500"
              animate={{
                x: ["-100%", "100%"],
                backgroundPosition: ["0% 0%", "100% 0%"],
              }}
              transition={{
                duration: 3.5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              style={{ width: "50%" }}
            />
          </motion.div>
        </motion.div>

        <div className="w-full relative">
          <motion.div
            ref={ref}
            className="relative z-10 mt-6 grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-3xl mx-auto"
          >
            <motion.div
              initial={{ opacity: 0, x: -100 }}
              animate={{ opacity: inView ? 1 : 0, x: inView ? 0 : -100 }}
              transition={{ type: "spring", stiffness: 100, delay: 0.4 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="relative group"
            >
              <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl blur-lg opacity-75 group-hover:opacity-100 transition duration-1000 group-hover:duration-200"></div>
              <input
                type="file"
                ref={inputRef}
                className="hidden"
                onChange={handleUpload}
                accept="video/*"
              />
              <button
                onClick={() => inputRef.current.click()}
                className="relative flex flex-col items-center justify-center h-64 w-full rounded-xl bg-gray-800 bg-opacity-90 backdrop-blur-sm border border-gray-700 p-6 shadow-lg transition-all duration-500 hover:shadow-xl"
              >
                <motion.div
                  className="w-16 h-16 mb-4 text-pink-500"
                  animate={{ rotateZ: [0, 10, -10, 0] }}
                  transition={{
                    repeat: Infinity,
                    duration: 4,
                    ease: "easeInOut",
                  }}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5m-13.5-9L12 3m0 0 4.5 4.5M12 3v13.5"
                    />
                  </svg>
                </motion.div>
                <h2 className="text-2xl font-bold text-white mb-2">
                  Upload Reels
                </h2>
                <p className="text-gray-300 text-center">
                  Share your moment with the world
                </p>

                <motion.div
                  className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-gray-900 to-transparent p-6 rounded-b-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  initial={{ y: 20 }}
                  whileHover={{ y: 0 }}
                >
                  <div className="flex items-center justify-center space-x-1">
                    <span className="block w-2 h-2 rounded-full bg-pink-500"></span>
                    <span className="block w-2 h-2 rounded-full bg-purple-500"></span>
                    <span className="block w-2 h-2 rounded-full bg-blue-500"></span>
                  </div>
                </motion.div>
              </button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: inView ? 1 : 0, x: inView ? 0 : 100 }}
              transition={{ type: "spring", stiffness: 100, delay: 0.6 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="relative group"
            >
              <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl blur-lg opacity-75 group-hover:opacity-100 transition duration-1000 group-hover:duration-200"></div>
              <button
                onClick={() => setShowReels(true)}
                className="relative flex flex-col items-center justify-center h-64 w-full rounded-xl bg-gray-800 bg-opacity-90 backdrop-blur-sm border border-gray-700 p-6 shadow-lg transition-all duration-500 hover:shadow-xl"
              >
                <motion.div
                  className="w-16 h-16 mb-4 text-blue-500"
                  animate={{ y: [0, -5, 0] }}
                  transition={{
                    repeat: Infinity,
                    duration: 2,
                    ease: "easeInOut",
                  }}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="m15.75 10.5 4.72-4.72a.75.75 0 0 1 1.28.53v11.38a.75.75 0 0 1-1.28.53l-4.72-4.72M4.5 18.75h9a2.25 2.25 0 0 0 2.25-2.25v-9a2.25 2.25 0 0 0-2.25-2.25h-9A2.25 2.25 0 0 0 2.25 7.5v9a2.25 2.25 0 0 0 2.25 2.25Z"
                    />
                  </svg>
                </motion.div>
                <h2 className="text-2xl font-bold text-white mb-2">
                  See Reels
                </h2>
                <p className="text-gray-300 text-center">
                  Discover amazing content
                </p>

                <motion.div
                  className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-gray-900 to-transparent p-6 rounded-b-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  initial={{ y: 20 }}
                  whileHover={{ y: 0 }}
                >
                  <div className="flex items-center justify-center space-x-1">
                    <span className="block w-2 h-2 rounded-full bg-blue-500"></span>
                    <span className="block w-2 h-2 rounded-full bg-purple-500"></span>
                    <span className="block w-2 h-2 rounded-full bg-pink-500"></span>
                  </div>
                </motion.div>
              </button>
            </motion.div>
          </motion.div>

          <motion.div
            className="absolute -bottom-16 -left-16 w-32 h-32 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 mix-blend-multiply filter blur-xl opacity-20"
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.2, 0.3, 0.2],
            }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div
            className="absolute -top-16 -right-16 w-32 h-32 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 mix-blend-multiply filter blur-xl opacity-20"
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.2, 0.3, 0.2],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 2,
            }}
          />
        </div>

        <motion.div
          className="mt-20 text-center"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1 }}
        >
          <div className="text-gray-400 mb-4">
            Your creative journey starts here
          </div>

          <motion.div
            className="h-0.5 w-1/3 mx-auto bg-gradient-to-r from-transparent via-purple-500 to-transparent"
            animate={{
              width: ["0%", "33%"],
              opacity: [0, 1],
            }}
            transition={{ duration: 2, delay: 1.5 }}
          />
        </motion.div>
      </motion.div>
      {showReels && <ReelsSection onClose={() => setShowReels(false)} />}
    </div>
  );
};

export default WelcomePage;
