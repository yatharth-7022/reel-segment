import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { GET_REELS } from "../api";
import { useEffect, useRef, useState } from "react";
import { FixedSizeList as List } from "react-window";
function ReelsSection({ onClose }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const listRef = useRef(null);

  const { data: reels, isLoading: reelsLoading } = useQuery({
    queryKey: ["reels"],
    queryFn: async () => {
      const response = await axios.get(GET_REELS);
      return response.data;
    },
  });
  console.log("Reels data:", reels);

  useEffect(() => {
    const handleScroll = () => {
      const list = listRef.current;
      if (!list) return;

      const items = list.innerElement.children;
      let newIndex = currentIndex;
      for (let i = 0; i < items?.length; i++) {
        const rect = items[i].getBoundingClientRect();
        const isHalfVisible =
          rect.top < window.innerHeight * 0.5 &&
          rect.bottom > window.innerHeight * 0.5;
        if (isHalfVisible) {
          newIndex = i;
          break;
        }
      }
      if (newIndex !== currentIndex) {
        setCurrentIndex(newIndex);
        items[newIndex].scrollIntoView({
          behavior: "smooth",
          block: "center",
        });
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [currentIndex]);

  return (
    <div className="fixed inset-0 z-50 backdrop-blur-md bg-black/60 flex flex-col items-center justify-center animate-fadeIn">
      {" "}
      <button
        className="absolute z-100 top-5 right-5 text-white"
        onClick={onClose}
      >
        ✖ Close
      </button>
      {reels?.length === 0 ? (
        <p>No reels available, Come back later!</p>
      ) : (
        <List
          height={window.innerHeight}
          itemCount={reels?.length}
          width={"100%"}
          ref={listRef}
          itemSize={window.innerHeight}
        >
          {({ index, style }) => (
            <div
              key={index}
              style={style}
              className="flex items-center justify-center"
            >
              <div className="w-[90%] max-w-md h-[90%] rounded-xl overflow-hidden shadow-lg">
                <video
                  src={reels[index].video_url}
                  className="w-full h-full object-cover"
                  controls
                  autoPlay
                  muted
                  loop
                  playsInline
                />
              </div>
            </div>
          )}
        </List>
      )}
    </div>
  );
}

export default ReelsSection;
