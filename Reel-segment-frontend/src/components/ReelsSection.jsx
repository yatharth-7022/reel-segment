import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import axios from "axios";
import { GET_REELS } from "../api";
import { useCallback, useEffect, useRef, useState } from "react";
import { FixedSizeList as List } from "react-window";

function ReelsSection({ onClose }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const listRef = useRef(null);
  const videoRef = useRef({});
  const observer = useRef(null);
  const LIMIT = 3;

  const { data, fetchNextPage, hasNextPage, isLoading, isFetchingNextPage } =
    useInfiniteQuery({
      queryKey: ["reels"],
      queryFn: async ({ pageParam = 1 }) => {
        const res = await axios.get(
          `${GET_REELS}?page=${pageParam}&limit=${LIMIT}`
        );
        return res.data;
      },
      getNextPageParam: (_, pages) => {
        if (_.length < LIMIT) return undefined;
        return pages.length + 1;
      },
    });
  // const { data, fetchNextPage, hasNextPage, isLoading, isFetchingNextPage } =
  //   useInfiniteQuery({
  //     queryKey: ["reels"],
  //     queryFn: async ({ pageParam = 1 }) => {
  //       const res = await axios.get(
  //         `${GET_REELS}/reels/get-all-reels?page=${pageParam}&limit=${LIMIT}`
  //       );
  //       return res.data;
  //     },
  //     getNextPageParam: (lastPage, allPages) => {
  //       // 👇 If we received less than LIMIT, no more pages to fetch
  //       if (lastPage.length < LIMIT) return undefined;
  //       return allPages.length + 1;
  //     },
  //   });

  const reels = data?.pages.flat() || [];
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          const video = entry.target;
          if (entry.isIntersecting) {
            video.play().catch(() => {});
          } else {
            video.pause();
          }
        }
      },
      { threshold: 0.6 }
    );

    Object.values(videoRef.current).forEach((video) => {
      if (video) observer.observe(video);
    });

    return () => {
      observer.disconnect();
    };
  }, [reels]);

  // Infinite scroll: load more when last reel is visible
  const lastReelRef = useCallback(
    (node) => {
      if (isFetchingNextPage) return;

      if (observer.current) observer.current.disconnect();

      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasNextPage) {
          fetchNextPage();
        }
      });

      if (node) observer.current.observe(node);
    },
    [isFetchingNextPage, hasNextPage, fetchNextPage]
  );
  return (
    <div className="fixed inset-0 z-50 backdrop-blur-md bg-black/60 flex flex-col items-center justify-center animate-fadeIn">
      <button
        className="absolute top-5 right-5 z-60 text-white"
        onClick={onClose}
      >
        ✖ Close
      </button>

      {isLoading ? (
        <p className="text-white">Loading reels...</p>
      ) : reels?.length === 0 ? (
        <p className="text-white">No reels available, Come back later!</p>
      ) : (
        <List
          height={window.innerHeight}
          itemCount={reels.length}
          width={"100%"}
          itemSize={window.innerHeight}
          ref={listRef}
        >
          {({ index, style }) => (
            <div
              key={index}
              style={style}
              className="flex items-center justify-center"
              ref={index === reels.length - 1 ? lastReelRef : null}
            >
              <div className="w-[90%] relative max-w-md h-[90%] rounded-xl overflow-hidden shadow-lg">
                <video
                  ref={(el) => (videoRef.current[index] = el)}
                  src={reels[index].video_url}
                  className="w-full h-full object-cover"
                  controls
                  muted
                  loop
                  autoPlay={index === currentIndex}
                  playsInline
                />
                <p className="absolute bottom-2 left-7 text-white flex flex-col">
                  <span>@{reels[index].username}</span>
                  <span>{reels[index].caption}</span>
                </p>
              </div>
            </div>
          )}
        </List>
      )}
    </div>
  );
}

export default ReelsSection;
