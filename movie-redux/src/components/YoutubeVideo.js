import React, { useEffect, useState } from "react";

const YouTubeVideo = ({ query }) => {
  const [videoUrl, setVideoUrl] = useState("");
  const API_KEY = "";

  useEffect(() => {
    const fetchYouTubeVideo = async () => {
      try {
        const response = await fetch(
          `https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=1&q=${encodeURIComponent(
            query
          )}&type=video&key=${API_KEY}`
        );
        const result = await response.json();
        
        if (result.items && result.items.length > 0) {
          const videoId = result.items[0].id.videoId;
          setVideoUrl(`https://www.youtube.com/embed/${videoId}`);
        } else {
          console.log("Không tìm thấy video nào.");
        }
      } catch (error) {
        console.error("Không thể lấy video từ YouTube:", error);
      }
    };

    fetchYouTubeVideo();
  }, [query]);

  return videoUrl ? (
    <iframe
      width="560"
      height="315"
      src={videoUrl}
      title="YouTube video player"
      frameBorder="0"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      allowFullScreen
    ></iframe>
  ) : (
    <div>Đang tải video...</div>
  );
};

export default YouTubeVideo;
