import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { USER } from "../api";

export const useWelcome = () => {
  const { data: userData } = useQuery({
    queryKey: ["user_data"],
    queryFn: async () => {
      const token = localStorage.getItem("token");
      const response = await axios.get(USER, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return response.data.user;
    },
    enabled: !!localStorage.getItem("token"),
  });
  return { userData };
};
