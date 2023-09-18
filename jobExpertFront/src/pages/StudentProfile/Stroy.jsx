import React, { useEffect, useState } from "react";
import axios from "../../components/Axios/axios";
import { useSelector } from "react-redux";

const Story = () => {
  const userDa = useSelector((state) => state);
  const imgx = userDa?.userData.userInfo?.userImg.length - 1;
  const email = userDa?.userData?.userInfo?.email;
  const profile = userDa?.userData.userInfo?.userImg[imgx];

  const [storyData, setStoryData] = useState({
    story: "",
    email: email,
    url: profile,
    name: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setStoryData({ ...storyData, [name]: value });
  };

  console.log(storyData);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("/jobExpert/api/v1/story-create", storyData);
      // Fetch all stories after creating a new story
      const response = await axios.get("/jobExpert/api/v1/story-all");
      setStories(response.data);
      setStoryData({
        story: "",
        email: email,
        url: profile,
        name: "",
      });
    } catch (error) {
      console.error("Error creating story:", error);
    }
  };

  const [stories, setStories] = useState([]);

  // Fetch all stories when the component mounts
  useEffect(() => {
    const fetchStories = async () => {
      try {
        const response = await axios.get("/jobExpert/api/v1/story-all");
        setStories(response.data);
      } catch (error) {
        console.error("Error fetching stories:", error);
      }
    };

    fetchStories();
  }, []);

  const handleDelete = async (storyId) => {
    try {
      await axios.delete(
        `/jobExpert/api/v1/story-delete/${storyId}?email=${email}`
      );
      // Fetch all stories after deleting a story
      const response = await axios.get("/jobExpert/api/v1/story-all");
      setStories(response.data);
      alert("Story deleted successfully!");
    } catch (error) {
      console.error("Error deleting story:", error);
      alert("Error deleting story.");
    }
  };

  return (
    <>
      <div className="max-w-lg mx-auto p-4">
        <h2 className="text-2xl font-semibold mb-4">Create a Story</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              htmlFor="story"
              className="block text-gray-700 font-semibold"
            >
              Story:
            </label>
            <textarea
              id="story"
              name="story"
              value={storyData.story}
              onChange={handleInputChange}
              className="border rounded-lg p-2 w-full h-32"
              required
            />
          </div>

          <div className="mb-4">
            <label htmlFor="name" className="block text-gray-700 font-semibold">
              Your Name:
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={storyData.name}
              onChange={handleInputChange}
              className="border rounded-lg p-2 w-full"
              required
            />
          </div>
          <button
            type="submit"
            className="bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary-dark focus:outline-none focus:ring focus:ring-primary focus:border-primary"
          >
            Submit Story
          </button>
        </form>
      </div>

      <div className="max-w-4xl mx-auto p-4">
        <h2 className="text-2xl font-semibold mb-4">All Stories</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {stories.length === 0 ? (
            <p className="text-gray-500">No stories available.</p>
          ) : (
            stories.map((story) => (
              <>
              {email === story.email && (
                <div
                  key={story._id}
                  className="bg-white p-4 rounded-lg shadow-md transition-transform transform hover:scale-105 relative"
                >
                  <button
                    className="absolute top-2 right-2 text-red-600 hover:text-red-800 focus:outline-none"
                    onClick={() => handleDelete(story._id)}
                  >
                    Delete
                  </button>
                
                  <h3 className="text-lg font-semibold mt-2">{story.name}</h3>
                  <p className="text-gray-600"> {story.story.split(' ').slice(0, 10).join(' ')}</p>
                  
                </div>
              )}
              </>
            ))
          )}
        </div>
      </div>
    </>
  );
};

export default Story;
