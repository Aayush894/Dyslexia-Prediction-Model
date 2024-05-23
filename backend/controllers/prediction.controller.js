import fetch from "node-fetch";

const imagePrediction = async (req, res) => {
  try {
    const text = req.body.text; // Extract 'text' from request body
    // console.log("Text received:", text);

    // const resultUrl = "https://serverdeploy-0xzn.onrender.com/api/submit_text";
    const resultUrl = "http://192.168.43.208:8000/api/submit_text";

    const response = await fetch(resultUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text: text }),
    });

    if (!response.ok) {
      throw new Error("Failed to fetch");
    }

    const data = await response.json(); // Parse response body as JSON
    // console.log("Response data:", data);

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
    const data = req.body.quiz;
    const time = req.body.time;

    const resultUrl = "http://192.168.43.208:8000/api/submit_quiz";

    const response = await fetch(resultUrl, {
      mode: "cors",
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        quiz: data,
        time: time,
      }),
    });

    if (!response.ok) {
      throw new Error("Failed to fetch");
    }

    const resultData = await response.json(); // Parse response body as JSON
    // console.log("Response data:", data);

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
