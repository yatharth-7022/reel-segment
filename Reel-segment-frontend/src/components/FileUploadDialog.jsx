import { QueryClient, useMutation } from "@tanstack/react-query";
import { useRef, useState } from "react";
import { REELS_UPLOAD } from "../api";
import axios from "axios";
import { toast } from "react-toastify";

export const FileUploadDialog = ({ open, onClose }) => {
  const [caption, setCaption] = useState("");
  const [fileName, setFileName] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const queryClient = new QueryClient();
  const fileInputRef = useRef(null);

  const fileUploadMutation = useMutation({
    mutationFn: async ({ file, caption }) => {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("caption", caption);
      const token = localStorage.getItem("token");
      const response = await axios.post(REELS_UPLOAD, formData, {
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
      onClose();
      setCaption("");
      setFileName("");
      setSelectedFile(null);
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

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedFile(file);
      setFileName(file.name);
    }
  };

  const handleUpload = () => {
    if (selectedFile) {
      if (!fileUploadMutation.isPending) {
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

      fileUploadMutation.mutate({
        file: selectedFile,
        caption: caption,
      });
    } else {
      toast.error("Please select a file first", {
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

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div
        className="fixed inset-0  bg-opacity-70 backdrop-blur-md"
        onClick={onClose}
      ></div>

      <div className="relative z-10 w-full max-w-md p-6 rounded-lg shadow-2xl bg-gray-900 border border-gray-700">
        <div className="flex flex-col gap-6">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-white">Upload Reel</h2>
            <p className="mt-1 text-gray-400">
              Add a video with an optional caption
            </p>
          </div>

          <div className="group">
            <label className="flex flex-col items-center justify-center w-full h-40 border-2 border-dashed rounded-lg cursor-pointer border-gray-600 hover:border-purple-500 bg-gray-800 hover:bg-gray-700 transition-all duration-300">
              <div className="flex flex-col items-center justify-center px-6 py-6 text-center">
                {fileName ? (
                  <>
                    <span className="text-sm text-purple-300 mb-2">
                      Selected file:
                    </span>
                    <span className="text-white font-medium">{fileName}</span>
                  </>
                ) : (
                  <>
                    <svg
                      className="w-10 h-10 mb-3 text-gray-400 group-hover:text-purple-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                      ></path>
                    </svg>
                    <p className="mb-2 text-sm text-gray-400 group-hover:text-gray-300">
                      <span className="font-semibold">Click to upload</span> or
                      drag and drop
                    </p>
                    <p className="text-xs text-gray-500 group-hover:text-gray-400">
                      Video files only
                    </p>
                  </>
                )}
              </div>
              <input
                type="file"
                ref={fileInputRef}
                className="hidden"
                accept="video/*"
                onChange={handleFileChange}
              />
            </label>
          </div>

          <div className="relative">
            <input
              type="text"
              value={caption}
              onChange={(e) => setCaption(e.target.value)}
              className="w-full p-4 bg-gray-800 border border-gray-700 rounded-lg placeholder-gray-500 text-white focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all duration-200"
              placeholder="Add a caption..."
            />
          </div>

          <div className="flex justify-end gap-3">
            <button
              onClick={onClose}
              className="px-5 py-2.5 rounded-lg text-white bg-gray-800 hover:bg-gray-700 transition-colors duration-200"
            >
              Cancel
            </button>
            <button
              onClick={handleUpload}
              disabled={fileUploadMutation.isPending}
              className={`px-5 py-2.5 rounded-lg ${
                fileUploadMutation.isPending
                  ? "bg-purple-400 cursor-not-allowed"
                  : "bg-purple-600 hover:bg-purple-700"
              } text-white font-medium transition-colors duration-200`}
            >
              {fileUploadMutation.isPending ? "Uploading..." : "Upload"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
