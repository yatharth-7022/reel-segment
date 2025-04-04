import { useQuery } from "@tanstack/react-query";
import { USER } from "../api";
import axiosInstance from "../Interceptor/axiosInstance";
import axios from "axios";

export const useWelcome = () => {
  const { data: userData } = useQuery({
    queryKey: ["user_data"],
    queryFn: async () => {
      const response = await axios.get(USER, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        withCredentials: true,
      });
      return response.data.user;
    },
    enabled: !!localStorage.getItem("token"),
  });
  return { userData };
};
