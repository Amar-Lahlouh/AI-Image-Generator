import React, { useContext, useState } from "react";
import ai from "../../assets/ai.png";
import axios from "axios";
import { toast } from "react-toastify";
import { AuthContext } from "../../Context/AuthContext";

function ImageGenerator() {
  const [imageUrl, setImageUrl] = useState(null);
  const [loading, setLoading] = useState(false);
  const [prompt, setPrompt] = useState("");
  const [imageLoaded, setImageLoaded] = useState(true);
  const { currentUser, setCurrentUser } = useContext(AuthContext);
  const handleGenerateImage = async () => {
    if (!currentUser) {
      toast.error("You Have to Login First!");
      return;
    }
    if (!prompt.trim()) return; // prevent empty request

    try {
      setLoading(true);
      setImageLoaded(false);
      const res = await fetch("http://localhost:5000/api/image/generateimage", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ prompt }),
      });

      const data = await res.json();

      setImageUrl(data.data);
      // AddImage(data.data);
      setLoading(false);
    } catch (err) {
      console.log("Error:", err);
    }
  };

  const AddImage = async (data) => {
    try {
      const res = await axios.post(
        "http://localhost:5000/api/user/addimage",
        { data },
        {
          withCredentials: true,
        },
      );
      console.log("image data", res);
      setCurrentUser((prev) => ({
        ...prev,
        user: {
          ...prev?.user,
          data: {
            ...prev?.user?.data,
            ImageHistory: [
              ...(Array.isArray(prev.user?.data?.ImageHistory)
                ? prev.user.data.ImageHistory
                : []),
              data, // ✅ use the function parameter (NOT imageUrl)
            ],
          },
        },
      }));
      setPrompt(null);
      setImageLoaded(true);
      toast.success(res.data.message);
    } catch (err) {
      toast.error(err.response.data.message);
      console.log(err);
    }
  };

  return (
    <div className="mt-8 text-center justify-center align-middle">
      {/* Title */}
      <h2 className="md:text-2xl font-bold">
        AI Image <span className="text-green-800">Generator</span>
      </h2>

      <div className="flex flex-col mt-5 items-center min-h-screen">
        {/* Image */}
        <div className="image">
          <img
            src={imageUrl || ai}
            alt="generated"
            onLoad={async () => {
              if (imageUrl && !imageLoaded) {
                setImageLoaded(true);
                await AddImage(imageUrl);
              }
            }}
            className={`md:w-[350px] w-[250px] transition-all ${
              !imageLoaded ? "blur-sm opacity-70" : ""
            }`}
          />
        </div>

        {/* Input + Button */}
        <div className="md:w-[40%] w-[90%] md:h-16 mt-5 flex justify-between p-2 md:px-2 items-center rounded-4xl bg-[#959996]">
          <input
            type="text"
            onChange={(e) => setPrompt(e.target.value)}
            value={prompt}
            placeholder="Describe what you want to see"
            className="outline-none text-white md:text-[18px] text-[12px] w-full md:p-2"
          />

          <div
            onClick={!loading ? handleGenerateImage : null}
            className={`md:p-4.5 p-2 md:w-[50%] rounded-4xl text-white text-center transition-all flex items-center justify-center gap-2 ${
              loading
                ? "bg-gray-500 cursor-not-allowed"
                : "bg-[#426857] cursor-pointer hover:opacity-80"
            }`}
          >
            {!imageLoaded || loading ? (
              <>
                <div className="w-4 md:text-[18px] text-[12px]  h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                Generating...
              </>
            ) : (
              <p className="md:text-[18px] text-[12px]">Generate</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ImageGenerator;
