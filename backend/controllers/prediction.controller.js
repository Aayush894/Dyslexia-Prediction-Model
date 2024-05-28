import fetch from "node-fetch";
import axios from 'axios';
import { v2 as cloudinary } from "cloudinary";

const imagePrediction = async (req, res) => {
  try {
    const { text } = req.body; // Extract 'text' from request body
    console.log("text:", text) ; 

    // var myHeaders = new Headers();
    // myHeaders.append("apikey", "I6WIDHSqFTkrapsMfS1HwbAyJPszUkcd");


    // var requestOptions = {
    //   method: 'POST',
    //   redirect: 'follow',
    //   headers: myHeaders,
    //   body: text
    // };

    // let response = {} ; 
    // fetch("https://api.apilayer.com/text_to_emotion", requestOptions)
    //   .then(response => response.text())
    //   .then(result =>{ console.log(result); res.status(200).json({ result: result }); })
    //   .catch(error => {console.log('error', error); res.status(500).json({ error: "Internal Server Error" })});

    const resultUrl = process.env.IMAGE_URL;
    if (!resultUrl) {
      throw new Error("IMAGE_URL is not defined in environment variables");
    }

    const response = await axios.post(resultUrl, { text }, {
      headers: { "Content-Type": "application/json" }
    });

    console.log("Response status:", response.status);
    console.log("Response data:", response.data);

    // if (response.ok === false){
    //   throw new Error(`HTTP error! status: ${response.status}`);
    // }

    // const data = await (); // Parse response body as JSON
    const data = response.data ; 

    console.log(data) ; 

    if (data && data.result) {
      res.status(200).json({ result: data.result });
    } else {
      throw new Error("Invalid response data");
    }
  } catch (error) {
    console.error("Error while fetching or processing result:", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const quizPrediction = async (req, res) => {
  try {
    const { quiz, time } = req.body;
    const resultUrl = process.env.QUIZ_URL;
    if (!resultUrl) {
      throw new Error("QUIZ_URL is not defined in environment variables");
    }

    const response = await fetch(resultUrl, {
      mode: "cors",
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ quiz, time }),
    });

    if (!response.ok) {
      throw new Error("Failed to fetch");
    }

    const resultData = await response.json(); // Parse response body as JSON

    if (resultData && resultData.result) {
      res.status(200).json({ ok: resultData.ok, result: resultData.result, message: resultData.message });
    } else {
      throw new Error("Invalid response data");
    }
  } catch (error) {
    console.error("Error while fetching or processing result:", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const deleteImage = async (publicId) => {
  try {
    const result = await cloudinary.uploader.destroy(publicId, { resource_type: "image" });
    if (result.result === "ok") {
      console.log('Image deleted successfully:', result);
      return true;
    } else {
      console.error('Failed to delete image:', result);
      return false;
    }
  } catch (error) {
    console.error('Error deleting image:', error);
    return false;
  }
};

const deleteImageControler = async (req, res) => {
  const { publicId } = req.body;

  if (!publicId) {
    return res.status(400).json({ error: "Invalid publicId" });
  }

  try {
    const isDeleted = await deleteImage(publicId);

    if (isDeleted) {
      return res.json({ ok: "true" });
    } else {
      return res.status(500).json({ error: "Failed to delete image" });
    }
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

const wakeUpCall =  async (req, res) => {
  try {
    const imageurl = process.env.IMAGE_URL;
    console.log(imageurl); 
    
    const text = "Hello, World! This is a test message. This is used for testing the API. Model API is working fine or not."
    const response = await fetch(imageurl, {
      mode: "cors", 
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({text: text}),
    });
    const data = await response.json();
    console.log(data);

    res.status(200).send({ success: true, message: "API Wake-up Call Success", data });
  } catch (error) {
    console.error("API Wake-up Call Failed:", error);
    res.status(500).send({ success: false, message: "API Wake-up Call Failed", error });
  }
}; 

export { imagePrediction, quizPrediction, deleteImageControler, wakeUpCall };
