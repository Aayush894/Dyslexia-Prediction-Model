import Footer from "../../components/Footer";
import { useState } from "react";

function ImagePrediction() {
  const [imageUrl, setImageUrl] = useState(null);
  const [imageAlt, setImageAlt] = useState(null);

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    const formData = new FormData();
    formData.append('image', file);
  
    fetch('http://localhost:5000/api/upload', {
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

  return (
    <div className="container d-flex justify-content-center align-items-center vh-100">
      <div className="row">
        <div className="col-md-6">
          <form className="border p-4">
            <h4 className="mb-4 text-center">Upload Image</h4>
            <div className="form-group">
              <input type="file" className="form-control-file" onChange={handleImageUpload} />
            </div>
            <button
              type="submit"
              className="btn btn-primary w-20 h-10 btn-block mt-4 p-1"
              onClick={handleImageUpload}
            >
              Submit
            </button>
          </form>
        </div>
        <div className="col-md-6">
          <div className="border p-4 m-2">
            <h4 className="mb-4 text-center">Preview</h4>
            <div className="text-center mb-4">The resulting image will be displayed here</div>
            {imageUrl && (
              <img src={imageUrl} alt={imageAlt} className="img-fluid displayed-image" />
            )}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default ImagePrediction;
