import fetch from "node-fetch";

const imagePrediction = async (req, res) => {
  try {
    const { text } = req.body; // Extract 'text' from request body
    console.log("text:", text) ; 

    const resultUrl = process.env.IMAGE_URL;
    if (!resultUrl) {
      throw new Error("IMAGE_URL is not defined in environment variables");
    }

    const response = await fetch(resultUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text }),
    });

    console.log(response) ; 

    if (!response.ok) {
      throw new Error("Failed to fetch");
    }

    const data = await response.json(); // Parse response body as JSON

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

export { imagePrediction, quizPrediction };
