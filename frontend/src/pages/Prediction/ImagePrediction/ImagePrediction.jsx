import Footer from "../../../components/Footer";
import Navbar from "../../../components/NavBar/NavBar.jsx";
import { useState } from "react";
import CircularProgress from "@mui/material/CircularProgress";

function ImagePrediction() {
  const [imageUrl, setImageUrl] = useState(null);
  const [imageAlt, setImageAlt] = useState(null);

  const [processing, setProcessing] = useState(false);
  const [result, setResult] = useState(null);


  const handleImageUpload = async (event) => {
    const file = event.target.files[0];
    const formData = new FormData();
    formData.append("image", file);

    await fetch("/api/upload", {
      method: "POST",
      body: formData,
    })
      .then((response) => {
        if (response.ok) {
          // Handle success
          console.log("Image uploaded successfully.");
          // Display the uploaded image
          setImageUrl(URL.createObjectURL(file));
          setImageAlt(file.name);
        } else {
          // Handle error
          console.error("Error uploading image:", response.statusText);
        }
      })
      .catch((error) => {
        console.error("Error uploading image:", error);
      });
  };

  const handleImageSubmit = async () => {
    setProcessing(true);
  
    try {
      const uploadUrl = "/api/uploadOnCloudinary";
  
      // Upload image to Cloudinary
      const response = await fetch(uploadUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          imageAlt: imageAlt,
        }),
      });
  
      if (!response.ok) {
        throw new Error("Failed to upload image to Cloudinary");
      }
  
      const uploadData = await response.json();
      const imageUrl = uploadData.url;
  
      const textConvertUrl = "/api/convertText";
  
      // Convert image to text
      const textResponse = await fetch(textConvertUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          url: imageUrl,
        }),
      });
  
      if (!textResponse.ok) {
        throw new Error("Failed to convert image to text");
      }
  
      const textData = await textResponse.json();
      const allText = JSON.parse(textData.text).all_text;
  
      const resultUrl = "/api/ImagePrediction";
  
      // Perform image prediction based on extracted text
      const predictionResponse = await fetch(resultUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: allText }),
      });
  
      if (!predictionResponse.ok) {
        throw new Error("Failed to fetch prediction result");
      }
  
      const predictionData = await predictionResponse.json();
  
      if (predictionData && predictionData.result) {
        setResult(predictionData.result);
      } else {
        throw new Error("Invalid prediction result");
      }
    } catch (error) {
      console.error("Error:", error.message);
    } finally {
      setProcessing(false);
    }
  };

  return (
    <>
      <div>
        <Navbar />
      </div>

      <div className="mt-2 ml-2 justify-center">
        <div className="flex flex-col md:flex-row md:mt-12 md:ml-10 justify-center">
          <div className="max-w-2xl w-80 md:w-50 h-100 rounded-lg shadow-xl bg-gray-50 mt-20">
            <div className="m-4">
              <label className="inline-block mb-2 text-gray-500">
                File Upload
              </label>
              <div className="flex items-center justify-center w-full">
                <label className="flex flex-col w-full h-32 border-4 border-blue-200 border-dashed hover:bg-gray-100 hover:border-gray-300">
                  <div className="flex flex-col items-center justify-center pt-7">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-8 h-8 text-gray-400 group-hover:text-gray-600"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                      />
                    </svg>
                    <p className="pt-1 text-sm tracking-wider text-gray-400 group-hover:text-gray-600">
                      Attach a file
                    </p>
                  </div>
                  <input
                    type="file"
                    className="opacity-0"
                    onChange={handleImageUpload}
                  />
                </label>
              </div>
            </div>
            <div className="flex justify-center p-2">
              <button
                className="w-full px-4 py-2 text-white bg-blue-500 rounded shadow-xl"
                type="submit"
                onClick={handleImageSubmit}
              >
                Submit
              </button>
            </div>
          </div>
          <div className="col-md-6">
            <div className="p-4">
              <div className="mb-4 text-center">
                <b>Preview</b>
              </div>
              <div className="flex justify-center items-center h-80 overflow-hidden">
                {" "}
                {imageUrl ? (
                  <img
                    src={imageUrl}
                    alt={imageAlt}
                    className="max-w-full max-h-full border-2 border-blue-300 rounded-lg shadow-xl"
                    style={{ objectFit: "contain" }}
                  />
                ) : (
                  <div className="text-gray-400 text-center w-80 border-4 border-dashed border-gray-300 rounded-lg p-4">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-16 h-16 mb-2 mx-auto"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                      />
                    </svg>
                    <p className="text-sm">No image uploaded</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-center mt-10">
        <div className="max-w-md w-full md:max-w-xl rounded-lg shadow-xl bg-gray-50 p-6">
          {processing ? (
            <div className="text-center">
              <p className="mb-4 text-lg font-semibold">Processing...</p>
              <div>
                <CircularProgress />
              </div>
            </div>
          ) : (
            <div className="text-center">
              {result ? (
                <div className="mb-4">
                  <b>Your result is: </b>
                  <span className="italic">{result}</span>
                </div>
              ) : (
                <div className="mb-4">
                  <b>No test taken yet!</b>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      <div>
        <Footer />
      </div>
    </>
  );
}

export default ImagePrediction;