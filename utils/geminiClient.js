import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

export const getAIInsight = async (prompt) => {
  try {
    // ✅ try new model, fallback to old if no output
    const model = "gemini-2.0-flash"; // you can also try "gemini-1.5-flash"

    const response = await ai.models.generateContent({
      model,
      contents: [
        {
          role: "user",
          parts: [
            {
              text: `${prompt}\n\nReturn ONLY valid JSON in this exact format:
              {
                "reasoning": "one-line reasoning",
                "sentiment": "Bullish/Bearish/Neutral"
              }`,
            },
          ],
        },
      ],
    });

    // ✅ Try multiple response shapes depending on SDK version
    let textResponse =
      response.outputText ||
      response?.candidates?.[0]?.content?.parts?.[0]?.text ||
      "";

    // Log for debugging (optional)
    console.log("Gemini raw:", textResponse);

    // Handle empty responses
    if (!textResponse.trim()) {
      console.warn("⚠️ Gemini returned empty output.");
      return {
        reasoning: "Gemini did not return insight.",
        sentiment: "Neutral",
      };
    }

    // ✅ Safely extract JSON portion
    const start = textResponse.indexOf("{");
    const end = textResponse.lastIndexOf("}");
    const jsonString = textResponse.slice(start, end + 1);

    return JSON.parse(jsonString);
  } catch (error) {
    console.error("Gemini Error:", error.message);
    return {
      reasoning: "Unable to fetch insight from Gemini.",
      sentiment: "Neutral",
    };
  }
};
