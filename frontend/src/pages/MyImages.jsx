import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../Context/AuthContext";
import loading from "../assets/loading.png";
import { FadeLoader } from "react-spinners";
function MyImages() {
  const { currentUser, setCurrentUser } = useContext(AuthContext);
  const [Loader, setLoader] = useState(false);
  const [Images, setImages] = useState([]);
  useEffect(() => {
    setLoader(true);
    if (currentUser?.user?.data?.ImageHistory?.length > 0) {
      setImages(currentUser.user.data.ImageHistory);
      setLoader(false);
    } else {
      setImages([]);
    }
  }, [currentUser]);
  const handleDownload = async (imgUrl, index) => {
    try {
      const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

      if (isMobile) {
        // 📱 Mobile fallback → open image
        window.open(imgUrl, "_blank");
        return;
      }

      // 💻 Desktop → download
      const response = await fetch(imgUrl);
      const blob = await response.blob();

      const url = window.URL.createObjectURL(blob);

      const link = document.createElement("a");
      link.href = url;
      link.download = `AI_Image_${Date.now()}.png`;

      document.body.appendChild(link);
      link.click();

      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (err) {
      console.log("Download error:", err);
    }
  };
  console.log("imae", Images);
  return (
    <div className="min-h-[100vh]">
      <h2 className="text-center font-bold text-2xl mb-6">
        My <span className="text-green-900 ">Images</span>{" "}
      </h2>
      {Loader ? (
        <div className="text-center flex justify-center mt-9">
          <FadeLoader />
        </div>
      ) : Images.length > 0 ? (
        <>
          <div className="image-list mx-auto items-center">
            {Images.map((img, index) => (
              <div className=" w-fit shadow-xl m-3">
                <img
                  src={img || loading}
                  key={index}
                  className="object-cover"
                />
                <button
                  onClick={() => handleDownload(img, index)}
                  className="border cursor-pointer block border-gray-300  p-2 mt-2 flex justify-center m-2 align-middle"
                >
                  Download
                </button>
              </div>
            ))}
          </div>
        </>
      ) : (
        <h2>No Images Yet</h2>
      )}
    </div>
  );
}

export default MyImages;
