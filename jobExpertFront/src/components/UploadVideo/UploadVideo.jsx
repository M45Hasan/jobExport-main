import React, { useEffect, useState } from "react";
import axios from "../Axios/axios"; // You'll need to import Axios or use your preferred HTTP library

const UploadVideo = () => {
  const [formData, setFormData] = useState({
    email: "",
    subject: "",
    text: "",
    title: "",
    videoUrl: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Make a POST request to your server to create the video
      await axios.post("/jobExpert/api/v1/video-upload", formData);

      // Optionally, you can show a success message or redirect the user
      alert("Video uploaded successfully!");

      // Clear the form after successful submission
      setFormData({
        email: "",
        subject: "",
        text: "",
        title: "",
        videoUrl: "",
      });
    } catch (error) {
      console.error(error);
      // Handle errors, show an error message, or redirect the user accordingly
      alert("Error uploading video.");
    }
  };

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

  const handleDelete = async (videoId) => {
    try {
      await axios.delete(`/jobExpert/api/v1/video-upload/${videoId}`);
      // After successful deletion, filter out the deleted video from the videos state
      setVideos((prevVideos) =>
        prevVideos.filter((video) => video._id !== videoId)
      );
      alert("Video deleted successfully.");
    } catch (error) {
      console.error(error);
      alert("Error deleting video.");
    }
  };

  return (
    <>
      <div className="p-4 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold mb-4">Upload Video</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-600 font-medium mb-2">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="block w-full p-2 border border-gray-300 rounded-lg shadow-md focus:outline-none focus:ring focus:ring-primary focus:border-primary"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-600 font-medium mb-2">
              Subject
            </label>
            <input
              type="text"
              name="subject"
              value={formData.subject}
              onChange={handleChange}
              className="block w-full p-2 border border-gray-300 rounded-lg shadow-md focus:outline-none focus:ring focus:ring-primary focus:border-primary"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-600 font-medium mb-2">Text</label>
            <textarea
              name="text"
              value={formData.text}
              onChange={handleChange}
              rows="4"
              className="block w-full p-2 border border-gray-300 rounded-lg shadow-md focus:outline-none focus:ring focus:ring-primary focus:border-primary"
              required
            ></textarea>
          </div>
          <div className="mb-4">
            <label className="block text-gray-600 font-medium mb-2">
              Title
            </label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className="block w-full p-2 border border-gray-300 rounded-lg shadow-md focus:outline-none focus:ring focus:ring-primary focus:border-primary"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-600 font-medium mb-2">
              Video URL
            </label>
            <input
              type="text"
              name="videoUrl"
              value={formData.videoUrl}
              onChange={handleChange}
              className="block w-full p-2 border border-gray-300 rounded-lg shadow-md focus:outline-none focus:ring focus:ring-primary focus:border-primary"
              required
            />
          </div>
          <div className="text-center">
            <button
              type="submit"
              className="px-4 py-2 bg-primary text-white rounded-lg shadow-md hover:bg-primary-dark focus:outline-none focus:ring focus:ring-primary-dark focus:border-primary-dark"
            >
              Upload Video
            </button>
          </div>
        </form>
      </div>
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
                  <iframe
                    title={video.title}
                    width="100%"
                    height="315"
                    src={`https://www.youtube.com/embed/${video.videoUrl}`}
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  ></iframe>
                </div>
                <button
                  onClick={() => handleDelete(video._id)}
                  className="mt-4 px-4 py-2 bg-red-500 text-white rounded-lg shadow-md hover:bg-red-600 focus:outline-none focus:ring focus:ring-red-500 focus:border-red-500"
                >
                  Delete
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default UploadVideo;
