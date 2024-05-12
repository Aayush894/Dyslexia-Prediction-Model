import fetch from 'node-fetch';
 
const imagePrediction = async (req, res) => {
    try {
        const text = req.body.text; // Extract 'text' from request body
        console.log("Text received:", text);

        const resultUrl = "http://127.0.0.1:8000/api/submit_text";
        
        const response = await fetch(resultUrl, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ text: text })
        });

        if (!response.ok) {
            throw new Error('Failed to fetch');
        }

        const data = await response.json(); // Parse response body as JSON
        console.log("Response data:", data);

        if (data && data.result) {
            res.status(200).json({ result: data.result });
        } else {
            throw new Error('Invalid response data');
        }
    } catch (error) {
        console.error("Error while fetching or processing result:", error.message);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

export { imagePrediction };
