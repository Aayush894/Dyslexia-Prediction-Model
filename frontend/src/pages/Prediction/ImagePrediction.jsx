import Footer from "../../components/Footer";
import Navbar from "../../components/NavBar/NavBar"
import { useState } from "react";

import { useNavigate } from "react-router-dom";

function ImagePrediction() {
  const [imageUrl, setImageUrl] = useState(null);
  const [imageAlt, setImageAlt] = useState(null);

  const navigate = useNavigate();

  const handleImageUpload = async (event) => {
    const file = event.target.files[0];
    const formData = new FormData();
    formData.append('image', file);

    await fetch('http://localhost:5000/api/upload', {
      method: 'POST',
      body: formData,
    })
      .then(response => {
        if (response.ok) {
          // Handle success
          console.log('Image uploaded successfully.');
          // Display the uploaded image
          setImageUrl(URL.createObjectURL(file));
          setImageAlt(file.name);
        } else {
          // Handle error
          console.error('Error uploading image:', response.statusText);
        }
      })
      .catch(error => {
        console.error('Error uploading image:', error);
      });
  };

  const handleImageSubmit = async () => {
    console.log(imageAlt);
    try {
      const response = await fetch("http://localhost:5000/api/uploadOnCloudinary", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          imageAlt: imageAlt,
        })
      });

      if (response.success) {
        // Handle success
        console.log('Image uploaded successfully.');
        // Write prediction logic
        const json = await response.json();
        const cloudinaryUrl = json.url;
        const publicId = json.public_id; // Additional metadata

        console.log(cloudinaryUrl, publicId);

        navigate("/");
      } else {
        console.error('Error uploading image:', response.statusText);
      }
    } catch (error) {
      console.error('Error uploading image to Cloudinary:', error);
    }
  };


  return (
    <>
      <Navbar />
      <div className="flex mt-10 ml-10 justify-center ">
        <div className="max-w-2xl rounded-lg shadow-xl bg-gray-50 m-5">
          <div className="m-4">
            <label className="inline-block mb-2 text-gray-500">File Upload</label>
            <div className="flex items-center justify-center w-full">
              <label
                className="flex flex-col w-full h-32 border-4 border-blue-200 border-dashed hover:bg-gray-100 hover:border-gray-300">
                <div className="flex flex-col items-center justify-center pt-7">
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8 text-gray-400 group-hover:text-gray-600"
                    fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                      d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                  </svg>
                  <p className="pt-1 text-sm tracking-wider text-gray-400 group-hover:text-gray-600">
                    Attach a file</p>
                </div>
                <input type="file" className="opacity-0" onChange={handleImageUpload} />
              </label>
            </div>
          </div>
          <div className="flex justify-center p-2">
            <button className="w-full px-4 py-2 text-white bg-blue-500 rounded shadow-xl"
              type="submit"
              onClick={handleImageSubmit}>
              Submit</button>
          </div>
        </div>
        <div classNameName="col-md-6 m-5">
            <div classNameName="border p-4 m-2 justify-center">
              <h4 classNameName="mb-4 text-center">Preview</h4>
              <div classNameName="text-center mb-4">The resulting image will be displayed here</div>
              {imageUrl && (
                <img src={imageUrl} alt={imageAlt} classNameName="img-fluid displayed-image" />
              )}
            </div>
          </div>
      </div>



      <div classNameName="container d-flex justify-content-center align-items-center vh-100">
        <div classNameName="row">
          {/* <div classNameName="col-md-6">
          <form classNameName="border p-4">
            <h4 classNameName="mb-4 text-center">Upload Image</h4>
            <div classNameName="form-group">
              <input type="file" classNameName="form-control-file" onChange={handleImageUpload} />
            </div>
            <button
              type="submit"
              classNameName="btn btn-primary w-20 h-10 btn-block mt-4 p-1"
              onClick={handleImageSubmit}
            >
              Submit
            </button>
          </form>
        </div> */}
          {/* <div classNameName="col-md-6">
            <div classNameName="border p-4 m-2">
              <h4 classNameName="mb-4 text-center">Preview</h4>
              <div classNameName="text-center mb-4">The resulting image will be displayed here</div>
              {imageUrl && (
                <img src={imageUrl} alt={imageAlt} classNameName="img-fluid displayed-image" />
              )}
            </div>
          </div> */}
        </div>
        <Footer />
      </div>
    </>
  );
}

export default ImagePrediction;
