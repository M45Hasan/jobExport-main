import React, { useEffect, useState } from "react";
import axios from "../components/Axios/axios";
import Banner from "../components/Banner/Banner";

const VideoSupport = () => {
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const response = await axios.get("/jobExpert/api/v1/video-upload");
        setVideos(response.data);
      } catch (error) {
        console.error(error);
        alert("Error fetching videos.");
      }
    };

    fetchVideos();
  }, []);

  return (
    <>
      <Banner />
      <div className="p-4">
        <h2 className="text-2xl font-semibold mb-4">All Videos</h2>
        {videos.length === 0 ? (
          <p className="text-gray-600">No videos found.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {videos.map((video) => (
              <div
                key={video._id}
                className="bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition duration-300"
              >
                <h3 className="text-lg font-semibold">{video.title}</h3>
                <p className="text-gray-600">{video.text}</p>
                <p className="text-primary mt-2">Subject: {video.subject}</p>
                <div className="mt-4">
                  {/* Embed YouTube video */}
                  <iframe
                    title={video.title}
                    width="100%"
                    height="315"
                    src={`${video.videoUrl}`}
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  ></iframe>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default VideoSupport;
